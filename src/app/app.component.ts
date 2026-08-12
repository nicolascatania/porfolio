import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroComponent } from './hero/hero.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { EducationComponent } from './education/education.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './ui/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    NavBarComponent,
    HeroComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechStackComponent,
    EducationComponent,
    AboutMeComponent,
    FooterComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // The artificial preloader that used to live here has been removed: it ran a
  // fake progress bar on a timer for ~1.8s before revealing content that was
  // already parsed, so it only ever added latency.
  title = 'porfolio';
}
