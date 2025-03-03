import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'nicolas20032401@gmail.com';

  constructor(private clipboard: Clipboard) { }

  copyEmail(): void {
    this.clipboard.copy(this.email);
  }
}
