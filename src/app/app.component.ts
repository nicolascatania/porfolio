import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HeroComponent } from "./hero/hero.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TechStackComponent } from "./tech-stack/tech-stack.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, HeroComponent, ProjectsComponent, TechStackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'porfolio';
}
