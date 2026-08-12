import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Education } from '../../models/Education';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';
import { SplitLinesPipe } from '../split-lines.pipe';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    TranslateModule,
    HighlightKeywordsPipe,
    SplitLinesPipe,
    ScrollAnimateDirective,
    SectionHeadingComponent,
  ],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  highlightedKeywords: string[] = [
    'Estructuras de datos',
    'Algoritmos',
    'Data structures',
    'Algorithms',
    'RESTful',
    'Java',
    'Spring Boot',
    'Spring',
    'Angular',
    'Ruby',
    'JS',
    'C',
    'API',
    'Backend',
  ];

  educations: Education[] = [
    {
      id: 1,
      title: 'ed.uni.title',
      institution: 'ed.uni.institution',
      yearIn: 'ed.uni.yearIn',
      yearOut: 'ed.uni.yearOut',
      description: 'ed.uni.description',
      facts: ['ed.uni.fact1', 'ed.uni.fact2'],
      current: true,
    },
    {
      id: 2,
      title: 'ed.ap.title',
      institution: 'ed.ap.institution',
      yearIn: 'ed.ap.yearIn',
      yearOut: 'ed.ap.yearOut',
      description: 'ed.ap.description',
    },
  ];
}
