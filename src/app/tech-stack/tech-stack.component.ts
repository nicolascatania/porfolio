import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Technology } from '../../models/Techology';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

interface TechGroup {
  labelKey: string;
  items: Technology[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TranslateModule, ScrollAnimateDirective, SectionHeadingComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  /**
   * Grouped rather than one flat grid of ten identical tiles: for a backend
   * profile, *how* the stack is organised says as much as its contents.
   */
  readonly groups: TechGroup[] = [
    {
      labelKey: 'ts.groups.languages',
      items: [
        { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
        { id: 2, name: 'C', src: 'assets/icons/c.svg' },
      ],
    },
    {
      labelKey: 'ts.groups.frameworks',
      items: [
        { id: 3, name: 'Spring Boot', src: 'assets/icons/spring.svg' },
        { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' },
      ],
    },
    {
      labelKey: 'ts.groups.data',
      items: [
        { id: 5, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },
        { id: 6, name: 'MySQL', src: 'assets/icons/mysql.svg' },
        { id: 7, name: 'SQL Server', src: 'assets/icons/mssql.svg' },
      ],
    },
    {
      labelKey: 'ts.groups.infra',
      items: [
        { id: 8, name: 'Docker', src: 'assets/icons/docker.svg' },
        { id: 9, name: 'RabbitMQ', src: 'assets/icons/rabbitmq.svg' },
        { id: 10, name: 'Git', src: 'assets/icons/git.svg' },
        { id: 11, name: 'Linux', src: 'assets/icons/linux.svg' },
        { id: 12, name: 'UML', src: 'assets/icons/uml.svg' },
      ],
    },
  ];
}
