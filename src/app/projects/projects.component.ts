import { Component, HostListener } from '@angular/core';
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
  selectedImages: string[] = [];
  currentImageIndex: number = 0;
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
      releaseYearNumber: 2025,
      importance: 8,
      githubLink: "https://github.com/nicolascatania/MySongSet",
      imageSrcs: ["assets/images/mysongsetscreenshot.png"]
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
      releaseYearNumber: 2024,
      importance: 7,
      githubLink: "https://github.com/nicolascatania/SpringAPI",
      imageSrcs: ["assets/images/webapp.jpg"]
    },
    {
      id: 3,
      name: 'projectsInfo.project3.name',
      description: 'projectsInfo.project3.desc', 
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' }
      ],
      releaseYear: 'projectsInfo.project3.releaseYear',
      releaseYearNumber: 2024,
      importance: 3,
      githubLink: "https://github.com/Guzman5825/TP2-MagiaYHechizeria",
      imageSrcs: ["assets/images/wizardsvsmortifacs.jpg"]
    },
    {
      id: 4,
      name: 'projectsInfo.project4.name',
      description: 'projectsInfo.project4.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' },
        { id: 3, name: 'Angular', src: 'assets/icons/angular.svg' },
        { id: 4, name: 'MySQL', src: 'assets/icons/mysql.svg' }
      ],
      releaseYear: 'projectsInfo.project4.releaseYear',
      releaseYearNumber: 2026,
      importance: 9,
      githubLink: "https://github.com/nicolascatania/BugdetKingg",
      imageSrcs: ["assets/images/bug2.jpg"]
    },
    {
      id: 5,
      name: 'projectsInfo.project5.name',
      description: 'projectsInfo.project5.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' }
        ,{ id: 3, name: 'MySQL', src: 'assets/icons/mysql.svg' }
        ,{ id: 4, name: 'RabbitMQ', src: 'assets/icons/rabbitmq.svg' }
        ,{ id: 5, name: 'Docker', src: 'assets/icons/docker.svg' }
        ,{ id: 6, name: 'k6', src: 'assets/icons/k6.svg' }
        ,{ id: 7, name: 'Prometheus', src: 'assets/icons/prometheus.svg' }
        ,{ id: 8, name: 'Grafana', src: 'assets/icons/grafana.svg' }
      ],
      releaseYear: 'projectsInfo.project5.releaseYear',
      releaseYearNumber: 2026,
      importance: 10,
      githubLink: "https://github.com/nicolascatania/url-shortener",
      imageSrcs: ["assets/images/ms.png"]
    },
    {
      id: 6,
      name: 'projectsInfo.project6.name',
      description: 'projectsInfo.project6.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' }
      ],
      releaseYear: 'projectsInfo.project6.releaseYear',
      releaseYearNumber: 2026,
      importance: 6,
      githubLink: "https://github.com/nicolascatania/simple-resilience-observability-springboot-4",
      imageSrcs: ["assets/images/resilienceproject.png"]
    },
    {
      id: 7,
      name: 'projectsInfo.project7.name',
      description: 'projectsInfo.project7.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' }
      ],
      releaseYear: 'projectsInfo.project7.releaseYear',
      releaseYearNumber: 2026,
      importance: 5,
      githubLink: "https://github.com/nicolascatania/the-runner",
      imageSrcs: ["assets/images/vt.png"]
    },
    {
      id: 8,
      name: 'projectsInfo.project8.name',
      description: 'projectsInfo.project8.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' }
      ],
      releaseYear: 'projectsInfo.project8.releaseYear',
      releaseYearNumber: 2026,
      importance: 6,
      githubLink: "https://github.com/nicolascatania/simple-gym-modulith",
      imageSrcs: ["assets/images/modulith.png"]
    },
    {
      id: 9,
      name: 'projectsInfo.project9.name',
      description: 'projectsInfo.project9.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring', src: 'assets/icons/spring.svg' }
        ,{ id: 3, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' }
      ],
      releaseYear: 'projectsInfo.project9.releaseYear',
      releaseYearNumber: 2026,
      importance: 4,
      githubLink: "https://github.com/nicolascatania/the-testcontainers",
      imageSrcs: ["assets/images/testcontainers.jpg"]
    }
  ].sort((a, b) => b.importance - a.importance || b.releaseYearNumber - a.releaseYearNumber);

  closeModal(){
    this.isModalVisible = false;
    this.selectedImages = [];
    this.currentImageIndex = 0;
  }

  openModal(projectImages: string[]){
    this.isModalVisible = true;
    this.selectedImages = projectImages;
    this.currentImageIndex = 0;
  }

  nextImage() {
    if (this.selectedImages.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedImages.length;
    }
  }

  prevImage() {
    if (this.selectedImages.length > 1) {
      this.currentImageIndex = this.currentImageIndex === 0 ? this.selectedImages.length - 1 : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number) {
    if (index >= 0 && index < this.selectedImages.length) {
      this.currentImageIndex = index;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isModalVisible) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
