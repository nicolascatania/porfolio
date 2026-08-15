import { Component, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { Certificate } from '../../models/Certificate';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

/** Hides the PDF chrome we don't need and fits the page to the dialog width. */
const EMBED_PARAMS = '#toolbar=1&navpanes=0&view=FitH';

/** Same document, stripped of every control: the card thumbnail is the first
 *  page and nothing else. Rendering it through the browser's own viewer avoids
 *  shipping a PDF library just to draw two images. */
const PREVIEW_PARAMS = '#page=1&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH';

/** Below this width the built-in PDF viewers (iOS Safari in particular) render
 *  a single unscrollable page inside a frame, so we hand the file off to the
 *  browser instead of framing something nobody can read. Card thumbnails fall
 *  back to the document mark for the same reason. */
const EMBED_MIN_WIDTH = '(min-width: 768px)';

interface CertificateCard {
  certificate: Certificate;
  preview: SafeResourceUrl;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [TranslateModule, ScrollAnimateDirective, SectionHeadingComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent implements OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);

  readonly certificates: Certificate[] = [
    {
      id: 1,
      title: 'certs.claudeCode.title',
      description: 'certs.claudeCode.desc',
      file: 'assets/certificates/Claude_Code_For_Devs_Certificate.pdf',
      topics: [
        'certs.topics.agents',
        'certs.topics.skills',
        'certs.topics.mcp',
        'certs.topics.worktrees',
        'certs.topics.sdd',
      ],
    },
    {
      id: 2,
      title: 'certs.testing.title',
      description: 'certs.testing.desc',
      file: 'assets/certificates/Testing_Course_Certificate.pdf',
      topics: [
        'certs.topics.tdd',
        'certs.topics.unitTesting',
        'certs.topics.integrationTesting',
        'certs.topics.junit',
        'certs.topics.mockito',
        'certs.topics.surefire',
        'certs.topics.jacoco',
      ],
    },
  ];

  /** Preview URLs are built once here rather than in the template: a method
   *  call would hand every card a fresh object on each change-detection pass
   *  and reload the PDF. */
  readonly cards: CertificateCard[] = this.certificates.map((certificate) => ({
    certificate,
    preview: this.sanitizer.bypassSecurityTrustResourceUrl(certificate.file + PREVIEW_PARAMS),
  }));

  readonly selected = signal<Certificate | null>(null);
  readonly canEmbed = signal(false);

  /** Built once per opening. Recomputing it in the template would hand the
   *  iframe a new object on every change-detection pass and reload the PDF. */
  readonly selectedUrl = signal<SafeResourceUrl | null>(null);

  private mediaQuery?: MediaQueryList;
  private lastFocused: HTMLElement | null = null;

  private readonly onMediaChange = (event: MediaQueryListEvent): void =>
    this.canEmbed.set(event.matches);

  constructor() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQuery = window.matchMedia(EMBED_MIN_WIDTH);
      this.canEmbed.set(this.mediaQuery.matches);
      this.mediaQuery.addEventListener('change', this.onMediaChange);
    }
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
    document.body.style.overflow = '';
  }

  open(certificate: Certificate): void {
    this.lastFocused = document.activeElement as HTMLElement;
    this.selected.set(certificate);
    this.selectedUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(certificate.file + EMBED_PARAMS)
    );
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector<HTMLElement>('.cert-close')?.focus());
  }

  close(): void {
    this.selected.set(null);
    this.selectedUrl.set(null);
    document.body.style.overflow = '';
    this.lastFocused?.focus();
    this.lastFocused = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.selected()) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'Tab') {
      // Keep focus inside the dialog; without this, tabbing walks the page
      // behind the overlay.
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const dialog = document.querySelector<HTMLElement>('.cert-dialog');
    if (!dialog) {
      return;
    }

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
