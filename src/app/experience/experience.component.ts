import { Component } from '@angular/core';
import { Experience } from '../../models/Experience';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
 imports: [HighlightKeywordsPipe, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  highlightedKeywords: string[] = ['MySQL','RESTful', 'Java', 'Spring', 'Angular', 'API', 'Backend', 'design'];


  experiences: Experience[] = [
    {
      id: 1,
      title: 'experience.netOne.title',
      institution: 'experience.netOne.institution',
      yearIn: 'experience.netOne.yearIn',
      yearOut: 'experience.netOne.yearOut',
      description: 'experience.netOne.description'
    },

  ];
}
