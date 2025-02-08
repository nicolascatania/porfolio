import { Component } from '@angular/core';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe'; 
import { TranslateModule } from '@ngx-translate/core';
import { Education } from '../../models/Education';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [HighlightKeywordsPipe, TranslateModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  highlightedKeywords: string[] = ['Estructuras de datos', 'Algoritmos','Analisis', 'Diseño', 'Sistemas','RESTful', 'Java', 'Spring', 'Angular', 'Algorithms', 'Data structures', 'C', 'API', 'Backend', 'Systems analysis', 'design'];


  educations: Education[] = [
    {
      id: 1,
      title: 'ed.uni.title',
      institution: 'ed.uni.institution',
      yearIn: 'ed.uni.yearIn',
      yearOut: 'ed.uni.yearOut',
      description: 'ed.uni.description'
    },
    {
      id: 2,
      title: 'ed.ap.title',
      institution: 'ed.ap.institution',
      yearIn: 'ed.ap.yearIn',
      yearOut: 'ed.ap.yearOut',
      description: 'ed.ap.description'
    },
    {
      id: 3,
      title: 'ed.secu.title',
      institution: 'ed.secu.institution',
      yearIn: 'ed.secu.yearIn',
      yearOut: 'ed.secu.yearOut',
      description: 'ed.secu.description'
    },
  ];
}
