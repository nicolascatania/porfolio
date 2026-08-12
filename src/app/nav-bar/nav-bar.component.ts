import {
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MultiLangService } from '../multi-lang.service';
import { MenuService } from '../menu.service';
import { DarkModeService } from '../dark-mode.service';

interface NavLink {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnDestroy {
  readonly mlangService = inject(MultiLangService);
  readonly menuService = inject(MenuService);
  readonly darkModeService = inject(DarkModeService);

  private readonly zone = inject(NgZone);

  readonly links: NavLink[] = [
    { id: 'experience', labelKey: 'navbar.experience' },
    { id: 'projects', labelKey: 'navbar.projects' },
    { id: 'tech-stack', labelKey: 'navbar.techStack' },
    { id: 'education', labelKey: 'navbar.education' },
    { id: 'about-me', labelKey: 'navbar.about' },
    { id: 'contact', labelKey: 'navbar.contact' },
  ];

  readonly languages = [
    { code: 'en', flag: 'assets/icons/uk.svg' },
    { code: 'es', flag: 'assets/icons/spain.svg' },
  ];

  isMenuOpen = false;
  readonly activeSection = signal<string>('');
  readonly isScrolled = signal<boolean>(false);

  private menuSubscription?: Subscription;
  private sectionObserver?: IntersectionObserver;
  private scrollHandler?: () => void;
  private rafId = 0;
  private lastFocused: HTMLElement | null = null;

  constructor() {
    this.menuSubscription = this.menuService.menuState$.subscribe((state) => {
      this.isMenuOpen = state;
      // Lock the page behind the sheet. Restoring to '' (not 'auto') leaves
      // whatever the stylesheet defines in charge.
      document.body.style.overflow = state ? 'hidden' : '';

      if (state) {
        this.lastFocused = document.activeElement as HTMLElement;
        // Wait for [inert] to come off before trying to focus into the sheet.
        setTimeout(() => this.sheetFocusable()[0]?.focus());
      } else {
        this.lastFocused?.focus();
        this.lastFocused = null;
      }
    });

    afterNextRender(() => {
      this.observeSections();
      this.trackScroll();
    });
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
    this.sectionObserver?.disconnect();
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    cancelAnimationFrame(this.rafId);
    document.body.style.overflow = '';
  }

  /** Highlights whichever section owns the middle band of the viewport. */
  private observeSections(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    this.links.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        this.sectionObserver?.observe(element);
      }
    });
  }

  /**
   * Reading progress + elevation. Runs outside Angular and writes straight to a
   * CSS custom property, so a scroll gesture costs zero change-detection cycles.
   * The zone is re-entered only when the elevation boolean actually flips.
   */
  private trackScroll(): void {
    const root = document.documentElement;

    const update = () => {
      this.rafId = 0;
      const scrolled = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, scrolled / max) : 0;

      root.style.setProperty('--scroll-progress', progress.toFixed(4));

      const shouldElevate = scrolled > 8;
      if (shouldElevate !== this.isScrolled()) {
        this.zone.run(() => this.isScrolled.set(shouldElevate));
      }
    };

    this.zone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        if (this.rafId === 0) {
          this.rafId = requestAnimationFrame(update);
        }
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      update();
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  /**
   * Keeps Tab inside the open sheet. Without it, tabbing walked straight into
   * the page behind the overlay — the gallery dialog already trapped focus,
   * the navigation sheet did not.
   */
  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: KeyboardEvent): void {
    if (!this.isMenuOpen) {
      return;
    }

    const focusable = this.sheetFocusable();
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !this.sheetContains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !this.sheetContains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  private sheetElement(): HTMLElement | null {
    return document.getElementById('mobile-menu');
  }

  private sheetContains(node: Element | null): boolean {
    return !!node && !!this.sheetElement()?.contains(node);
  }

  private sheetFocusable(): HTMLElement[] {
    const sheet = this.sheetElement();
    if (!sheet) {
      return [];
    }
    return Array.from(
      sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  isActive(section: string): boolean {
    return this.activeSection() === section;
  }

  setActive(section: string): void {
    this.activeSection.set(section);
  }

  toggleMenu(): void {
    this.menuService.toggleMenu();
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.menuService.toggleMenu();
    }
  }

  onSheetNavigate(section: string): void {
    this.setActive(section);
    this.closeMenu();
  }

  toggleLanguage(lang: string): void {
    if (this.mlangService.languageSignal() !== lang) {
      this.mlangService.updateLanguage(lang);
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
