import { Component } from '@angular/core';
import { Project } from '../../models/Project';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      name: 'MySongSet',
      description: 'Web application for organizing guitar playlists with Spotify API integration, featuring song categorization and practice progress tracking.',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },
        { id: 3, name: 'Spring', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' }
      ],
      releaseYear: 2025,
      githubLink: "https://github.com/nicolascatania/MySongSet"
    },
    {
      id: 2,
      name: 'Basic products API',
      description: 'API featuring CRUD of different entities such as products and users, user roles, Spring Security, and JWT auth. Includes a basic frontend.',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'MySQL', src: 'assets/icons/mysql.svg' },
        { id: 3, name: 'Spring', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' }
      ],
      releaseYear: 2024,
      githubLink: "https://github.com/nicolascatania/SpringAPI"
    },
    {
      id: 3,
      name: 'Battle simulation in Java',
      description: 'Final project developed in a group for an advanced programming subject. Console application built in Java using many design patterns, with a small connection to Prolog.',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' }
      ],
      releaseYear: 2024,
      githubLink: "https://github.com/Guzman5825/TP2-MagiaYHechizeria"
    }
  ];
}
