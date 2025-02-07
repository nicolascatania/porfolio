import { Component, inject } from '@angular/core';
import { MultiLangService } from '../multi-lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  mlangService = inject(MultiLangService);

  toggleLanguage(lang: string): void{
    console.log('Trying to change to:', lang);
    if(this.mlangService.languageSignal() !== lang){
      this.mlangService.updateLanguage(lang);
      console.log('Language changed to', lang); //remove after testing
    }
  }


}
