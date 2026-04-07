import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, MatSnackBarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'devcatania@gmail.com';

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar, private translate: TranslateService) { }

  copyEmail(): void {
    this.clipboard.copy(this.email);
    const message = this.translate.instant('contactInfo.copySuccess');
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
