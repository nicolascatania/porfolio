import { Component, HostListener, computed, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../models/Project';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

/** A tech must appear in at least this many projects to earn a filter chip —
 *  otherwise the filter row turns into a wall of one-hit tags. */
const MIN_PROJECTS_PER_FILTER = 2;

/** Projects at or above this importance get the "featured" treatment. */
const FEATURED_THRESHOLD = 9;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, HighlightKeywordsPipe, ScrollAnimateDirective, SectionHeadingComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  highlightedKeywords: string[] = [
    'RESTful',
    'Java',
    'Spring Boot',
    'Spring',
    'Angular',
    'Algorithms',
    'Data structures',
    'API',
    'Backend',
    'MySQL',
    'PostgreSQL',
    'CRUD',
    'Testing',
    'JWT',
    'Design patterns',
    'Prolog',
    'RabbitMQ',
    'Testcontainers',
    'hexagonal',
    'microservices',
    'Resilience4j',
    'Spring Modulith',
    'CI/CD',
  ];

  readonly projects: Project[] = [
    {
      id: 5,
      name: 'projectsInfo.project5.name',
      description: 'projectsInfo.project5.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 3, name: 'MySQL', src: 'assets/icons/mysql.svg' },
        { id: 4, name: 'RabbitMQ', src: 'assets/icons/rabbitmq.svg' },
        { id: 5, name: 'Docker', src: 'assets/icons/docker.svg' },
        { id: 6, name: 'k6', src: 'assets/icons/k6.svg' },
        { id: 7, name: 'Prometheus', src: 'assets/icons/prometheus.svg' },
        { id: 8, name: 'Grafana', src: 'assets/icons/grafana.svg' },
      ],
      releaseYear: 'projectsInfo.project5.releaseYear',
      releaseYearNumber: 2026,
      importance: 10,
      githubLink: 'https://github.com/nicolascatania/url-shortener',
      imageSrcs: ['assets/images/ms.webp'],
    },
    {
      id: 4,
      name: 'projectsInfo.project4.name',
      description: 'projectsInfo.project4.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 3, name: 'Angular', src: 'assets/icons/angular.svg' },
        { id: 4, name: 'MySQL', src: 'assets/icons/mysql.svg' },
      ],
      releaseYear: 'projectsInfo.project4.releaseYear',
      releaseYearNumber: 2026,
      importance: 9,
      githubLink: 'https://github.com/nicolascatania/BugdetKingg',
      imageSrcs: [
        'assets/images/bugdetKing/d_home.webp',
        'assets/images/bugdetKing/d_dashboard.webp',
        'assets/images/bugdetKing/d_login.webp',
        'assets/images/bugdetKing/l_home.webp',
        'assets/images/bugdetKing/l_login.webp',
        'assets/images/bugdetKing/l_dashboard_mobile.webp',
      ],
    },
    {
      id: 1,
      name: 'projectsInfo.project1.name',
      description: 'projectsInfo.project1.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },
        { id: 3, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' },
      ],
      releaseYear: 'projectsInfo.project1.releaseYear',
      releaseYearNumber: 2025,
      importance: 8,
      githubLink: 'https://github.com/nicolascatania/MySongSet',
      imageSrcs: ['assets/images/mysongsetscreenshot.webp'],
    },
    {
      id: 2,
      name: 'projectsInfo.project2.name',
      description: 'projectsInfo.project2.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'MySQL', src: 'assets/icons/mysql.svg' },
        { id: 3, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' },
      ],
      releaseYear: 'projectsInfo.project2.releaseYear',
      releaseYearNumber: 2024,
      importance: 7,
      githubLink: 'https://github.com/nicolascatania/SpringAPI',
      imageSrcs: ['assets/images/webapp.webp'],
    },
    {
      id: 8,
      name: 'projectsInfo.project8.name',
      description: 'projectsInfo.project8.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
      ],
      releaseYear: 'projectsInfo.project8.releaseYear',
      releaseYearNumber: 2026,
      importance: 6,
      githubLink: 'https://github.com/nicolascatania/simple-gym-modulith',
      imageSrcs: ['assets/images/modulith.png'],
      lab: true,
    },
    {
      id: 6,
      name: 'projectsInfo.project6.name',
      description: 'projectsInfo.project6.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
      ],
      releaseYear: 'projectsInfo.project6.releaseYear',
      releaseYearNumber: 2026,
      importance: 6,
      githubLink: 'https://github.com/nicolascatania/simple-resilience-observability-springboot-4',
      imageSrcs: ['assets/images/resilienceproject.webp'],
      lab: true,
    },
    {
      id: 7,
      name: 'projectsInfo.project7.name',
      description: 'projectsInfo.project7.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
      ],
      releaseYear: 'projectsInfo.project7.releaseYear',
      releaseYearNumber: 2026,
      importance: 5,
      githubLink: 'https://github.com/nicolascatania/the-runner',
      imageSrcs: ['assets/images/vt.webp'],
      lab: true,
    },
    {
      id: 9,
      name: 'projectsInfo.project9.name',
      description: 'projectsInfo.project9.desc',
      technologies: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 3, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },
      ],
      releaseYear: 'projectsInfo.project9.releaseYear',
      releaseYearNumber: 2026,
      importance: 4,
      githubLink: 'https://github.com/nicolascatania/the-testcontainers',
      imageSrcs: ['assets/images/testcontainers.webp'],
      lab: true,
    },
    {
      id: 3,
      name: 'projectsInfo.project3.name',
      description: 'projectsInfo.project3.desc',
      technologies: [{ id: 1, name: 'Java', src: 'assets/icons/java.svg' }],
      releaseYear: 'projectsInfo.project3.releaseYear',
      releaseYearNumber: 2024,
      importance: 3,
      githubLink: 'https://github.com/Guzman5825/TP2-MagiaYHechizeria',
      imageSrcs: ['assets/images/wizardsvsmortifacs.webp'],
    },
  ].sort((a, b) => b.importance - a.importance || b.releaseYearNumber - a.releaseYearNumber);

  /** Tech names common enough to be worth filtering by. */
  readonly filters: string[] = (() => {
    const counts = new Map<string, number>();
    this.projects.forEach((project) => {
      new Set(project.technologies.map((t) => t.name)).forEach((name) =>
        counts.set(name, (counts.get(name) ?? 0) + 1)
      );
    });

    return [...counts.entries()]
      .filter(([, count]) => count >= MIN_PROJECTS_PER_FILTER)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  })();

  readonly activeFilter = signal<string | null>(null);

  /** Full-card projects: the ones with real scope. */
  readonly mainProjects = this.projects.filter((project) => !project.lab);

  /** Compact list: focused experiments built to learn one specific thing. */
  readonly labProjects = this.projects.filter((project) => project.lab);

  readonly visibleProjects = computed(() => this.applyFilter(this.mainProjects));
  readonly visibleLabProjects = computed(() => this.applyFilter(this.labProjects));

  readonly visibleCount = computed(
    () => this.visibleProjects().length + this.visibleLabProjects().length
  );

  private applyFilter(source: Project[]): Project[] {
    const filter = this.activeFilter();
    if (!filter) {
      return source;
    }
    return source.filter((project) => project.technologies.some((tech) => tech.name === filter));
  }

  // ── Gallery modal ──────────────────────────────────────────────────────
  isModalVisible = false;
  selectedImages: string[] = [];
  currentImageIndex = 0;

  private lastFocusedElement: HTMLElement | null = null;
  private touchStartX = 0;

  isFeatured(project: Project): boolean {
    return project.importance >= FEATURED_THRESHOLD;
  }

  setFilter(filter: string | null): void {
    this.activeFilter.set(filter);
  }

  openModal(projectImages: string[]): void {
    this.lastFocusedElement = document.activeElement as HTMLElement;
    this.isModalVisible = true;
    this.selectedImages = projectImages;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector<HTMLElement>('.modal-close-button')?.focus());
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedImages = [];
    this.currentImageIndex = 0;
    document.body.style.overflow = '';
    this.lastFocusedElement?.focus();
    this.lastFocusedElement = null;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const swipeThreshold = 40;
    if (deltaX > swipeThreshold) {
      this.prevImage();
    } else if (deltaX < -swipeThreshold) {
      this.nextImage();
    }
  }

  nextImage(): void {
    if (this.selectedImages.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedImages.length;
    }
  }

  prevImage(): void {
    if (this.selectedImages.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === 0 ? this.selectedImages.length - 1 : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number): void {
    if (index >= 0 && index < this.selectedImages.length) {
      this.currentImageIndex = index;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isModalVisible) {
      return;
    }

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
      case 'Tab':
        // Keep focus inside the dialog; without this, tabbing walks the page
        // behind the overlay.
        this.trapFocus(event);
        break;
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    const modal = document.querySelector<HTMLElement>('.modal-content');
    if (!modal) {
      return;
    }

    const focusable = modal.querySelectorAll<HTMLElement>(
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
