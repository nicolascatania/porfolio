import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MultiLangService } from '../multi-lang.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  engCv: string = 'assets/cv/Catania_Nicolas_english_cv.pdf';
  spaCv: string = 'assets/cv/Catania_Nicolas_espanol_cv.pdf';
  cvToRetrieve: string = '';

  constructor(
    private multiLangService: MultiLangService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.cvToRetrieve = this.multiLangService.languageSignal() === 'es' ? this.spaCv : this.engCv;

    this.multiLangService.language$.subscribe(lang => {
      this.cvToRetrieve = lang === 'es' ? this.spaCv : this.engCv;
    });
  }

  openMenu() {
    this.menuService.toggleMenu();
  }
}

