import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HeroComponent } from "./hero/hero.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TechStackComponent } from "./tech-stack/tech-stack.component";
import { EducationComponent } from "./education/education.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { DarkModeService } from './dark-mode.service';
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, HeroComponent, ExperienceComponent, ProjectsComponent, TechStackComponent, EducationComponent, AboutMeComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'porfolio';
  isLoading = true;
  progress = 0;
  private progressTimer?: number;

  darkModeService: DarkModeService = inject(DarkModeService);

  ngOnInit(): void {
    this.startPreloader();
  }

  private startPreloader(): void {
    window.addEventListener('load', () => this.completePreloader());

    this.progressTimer = window.setInterval(() => {
      if (this.progress < 90) {
        this.progress += 10;
      }
    }, 120);

    setTimeout(() => this.completePreloader(), 1800);
  }

  private completePreloader(): void {
    if (!this.isLoading) {
      return;
    }

    if (this.progressTimer !== undefined) {
      window.clearInterval(this.progressTimer);
    }

    this.progress = 100;
    setTimeout(() => (this.isLoading = false), 250);
  }
}
