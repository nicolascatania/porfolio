import { Component } from '@angular/core';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';

import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HighlightKeywordsPipe, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  isModalVisible: Boolean = false;
  selectedImage: string | null = '';
  highlightedKeywords: string[] = ['RESTful', 'Java', 'Spring', 'Angular', 'Algorithms', 'Data structures', 'C', 'API', 'Backend', 'MySQL', 'PostgreSQL', 'CRUD', 'Testing', 'UX', 'UI', 'Security', 'JWT', 'Design patterns', 'Prolog'];
  
  projects: Project[] = [
    {
      id: 1,
      name: 'projectsInfo.project1.name',
      description: 'projectsInfo.project1.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },
        { id: 3, name: 'Spring', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' }
      ],
      releaseYear: 'projectsInfo.project1.releaseYear',
      githubLink: "https://github.com/nicolascatania/MySongSet",
      imageSrc: "assets/images/mysongsetscreenshot.png"
    },
    {
      id: 2,
      name: 'projectsInfo.project2.name',
      description: 'projectsInfo.project2.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'MySQL', src: 'assets/icons/mysql.svg' },
        { id: 3, name: 'Spring', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' }
      ],
      releaseYear: 'projectsInfo.project2.releaseYear',
      githubLink: "https://github.com/nicolascatania/SpringAPI",
      imageSrc: "assets/images/webapp.jpg"
    },
    {
      id: 3,
      name: 'projectsInfo.project3.name',
      description: 'projectsInfo.project3.desc', 
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' }
      ],
      releaseYear: 'projectsInfo.project3.releaseYear',
      githubLink: "https://github.com/Guzman5825/TP2-MagiaYHechizeria",
      imageSrc: "assets/images/wizardsvsmortifacs.jpg"
    }
  ];

  closeModal(){
    this.isModalVisible = false;
    this.selectedImage = '';
  }

  openModal(projectImage: string){
    this.isModalVisible = true;
    this.selectedImage = projectImage;

  }
}
