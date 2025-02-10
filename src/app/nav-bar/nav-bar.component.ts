import { Component, inject } from '@angular/core';
import { MultiLangService } from '../multi-lang.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  
  mlangService = inject(MultiLangService);
  menuService = inject(MenuService);
  private menuSubscription: Subscription;

  isMenuOpen: boolean = false;


  constructor() {
    this.menuSubscription = this.menuService.menuState$.subscribe(state => {
      this.isMenuOpen = state;
      document.body.style.overflow = state ? 'hidden' : 'auto';
    });
  }

  toggleMenu(): void {
    this.menuService.toggleMenu();
  }


  toggleLanguage(lang: string): void{
    if(this.mlangService.languageSignal() !== lang){
      this.mlangService.updateLanguage(lang);
    }
  }


}
