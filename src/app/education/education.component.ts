import { Component } from '@angular/core';
import { HighlightKeywordsPipe } from '../highlight-keywords.pipe'; 

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [HighlightKeywordsPipe],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  highlightedKeywords: string[] = ['RESTful', 'Java', 'Spring', 'Angular', 'Algorithms', 'Data structures', 'C', 'API', 'Backend', 'Systems analysis', 'design'];

  educations = [
    {
      id: 1,
      title: 'Software Engineer student',
      institution: 'Universidad de La Matanza',
      yearIn: 2021,
      yearOut: 'In progress',
      description:
        'With 50% of the career completed and GPA of 8 out of 10, this career gives me a strong background in computer science, data structures, and algorithms with C, OOP with Java, as well as systems analysis, systems design and basic networking and cryptography knowledge.',
    },
    {
      id: 2,
      title: 'Fullstack software developer',
      institution: '"Argentina Programa", provided by the National Ministry of Economy',
      yearIn: 2022,
      yearOut: 2023,
      description:
        'First stage completed where we learned OOP with Ruby and JS. On the other hand, I was not able to complete the second stage due to personal issues, which covered Angular, Java, and Spring Boot programming to create RESTful APIs and web applications, although I learned a lot of valuable knowledge.',
    },
    {
      id: 3,
      title: 'Highschool degree',
      institution: 'Amancio Alcorta Institute',
      yearIn: 2014,
      yearOut: 2020,
      description: 'Social sciences oriented highschool.',
    },
  ];
}
