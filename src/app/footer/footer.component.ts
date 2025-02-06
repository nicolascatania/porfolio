import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'nicolas20032401@.com';

  constructor(private clipboard: Clipboard) { }

  copyEmail(): void {
    this.clipboard.copy(this.email);
  }
}
