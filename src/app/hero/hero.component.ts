import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MultiLangService } from '../multi-lang.service';

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

  constructor(private multiLangService: MultiLangService) {}

  ngOnInit() {
    // Obtener el idioma actual al iniciar
    this.cvToRetrieve = this.multiLangService.languageSignal() === 'es' ? this.spaCv : this.engCv;

    // Suscribirse a cambios de idioma
    this.multiLangService.language$.subscribe(lang => {
      this.cvToRetrieve = lang === 'es' ? this.spaCv : this.engCv;
    });
  }
}

