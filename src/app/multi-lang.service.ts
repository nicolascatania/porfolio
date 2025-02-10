import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, windowWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiLangService {

  translateService = inject(TranslateService);


  private languageSubject = new BehaviorSubject<string>(localStorage.getItem('languageSignal') || 'en');
  language$ = this.languageSubject.asObservable();

  languageSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('languageSignal') || '"en"')
  );

  updateLanguage(lang: string): void {
    const newLang = lang === 'es' ? 'es' : 'en';
    this.languageSignal.set(newLang);
  }

  constructor() {
    effect(() => {
      const lang = this.languageSignal();
      window.localStorage.setItem('languageSignal', JSON.stringify(lang));
      this.translateService.use(lang);
      this.languageSubject.next(lang);
    });
  }
}
