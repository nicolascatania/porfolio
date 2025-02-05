import { Component } from '@angular/core';
import { Technology } from '../../models/Techology';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  technologies: Technology[] =[
    { id: 1, name: 'Java', src: 'assets/icons/java.svg' },
    { id: 3, name: 'Spring', src: 'assets/icons/spring.svg' },
    { id: 6, name: 'C', src: 'assets/icons/c.svg'},
    { id: 4, name: 'Angular', src: 'assets/icons/angular.svg' },
    { id: 2, name: 'PostgreSQL', src: 'assets/icons/postgres.svg' },  
    { id: 5, name: 'MySQL', src: 'assets/icons/mysql.svg'},
    { id: 7, name: 'Microsoft SQL Server', src:'assets/icons/mssql.svg'},
    { id: 8, name: 'Linux', src: 'assets/icons/linux.svg'},
    { id: 9, name: 'Git', src: 'assets/icons/git.svg'},
    { id: 10, name: 'UML', src: 'assets/icons/uml.svg'}
  ]
}
