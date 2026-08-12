import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../../models/Experience';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';
import { SplitLinesPipe } from '../split-lines.pipe';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    TranslateModule,
    HighlightKeywordsPipe,
    SplitLinesPipe,
    ScrollAnimateDirective,
    SectionHeadingComponent,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  highlightedKeywords: string[] = [
    'MySQL',
    'RESTful',
    'Java',
    'Spring Boot',
    'Spring',
    'Angular',
    'API',
    'Backend',
    'JWT',
    'OpenAPI',
    'Swagger',
    'Clean Code',
    'virtual threads',
    'JUnit 5',
    'Mockito',
    'Cypress',
  ];

  experiences: Experience[] = [
    {
      id: 1,
      title: 'experience.netOne.title',
      institution: 'experience.netOne.institution',
      yearIn: 'experience.netOne.yearIn',
      yearOut: 'experience.netOne.yearOut',
      description: 'experience.netOne.description',
      stack: ['Java 21', 'Spring Boot', 'Angular', 'MySQL', 'JWT', 'OpenAPI', 'JUnit 5', 'Mockito'],
      current: true,
    },
  ];
}
