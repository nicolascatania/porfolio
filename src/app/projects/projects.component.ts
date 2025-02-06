import { Component } from '@angular/core';
import { Project } from '../../models/Project';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HighlightKeywordsPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {

  highlightedKeywords: string[] = ['RESTful', 'Java', 'Spring', 'Angular', 'Algorithms', 'Data structures', 'C', 'API', 'Backend', 'MySQL', 'PostgreSQL', 'CRUD', 'Testing', 'UX', 'UI', 'Security', 'JWT', 'Design patterns', 'Prolog'];

  projects: Project[] = [
    {
      id: 1,
      name: 'MySongSet',
      description: 'Web application for organizing songs that I play on the guitar in playlists, using Spotify API integration and a minimalistic UI desing, it helped me to not forget about the songs that I know, because I always end up playing the same 10 over and over.',
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
