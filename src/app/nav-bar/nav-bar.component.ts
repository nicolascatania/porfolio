import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { MultiLangService } from '../multi-lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../dark-mode.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  mlangService = inject(MultiLangService);
  menuService = inject(MenuService);
  private menuSubscription!: Subscription;

  isMenuOpen: boolean = false;
  activeSection = signal<string>('');

  darkModeService: DarkModeService = inject(DarkModeService);

  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    this.menuSubscription = this.menuService.menuState$.subscribe(state => {
      this.isMenuOpen = state;
      document.body.style.overflow = state ? 'hidden' : 'auto';
    });

    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.observer?.disconnect();
  }

  private setupIntersectionObserver() {
    // Contact se activa manualmente al hacer click, no con scroll
    const sections = ['experience', 'projects', 'tech-stack', 'education', 'about-me'];
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        this.observer?.observe(element);
      }
    });
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


  toggleLanguage(lang: string): void{
    if(this.mlangService.languageSignal() !== lang){
      this.mlangService.updateLanguage(lang);
    }
  }

  toggleDarkMode(){
    this.darkModeService.toggleDarkMode();
  }


}
