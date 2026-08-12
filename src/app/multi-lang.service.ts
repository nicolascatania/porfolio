import { Injectable, effect, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'languageSignal';
const SUPPORTED = ['en', 'es'] as const;
type Lang = (typeof SUPPORTED)[number];

function resolveInitialLanguage(): Lang {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '""');
    if (SUPPORTED.includes(stored)) {
      return stored;
    }
    // No stored choice: follow the browser rather than forcing English.
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

@Injectable({
  providedIn: 'root',
})
export class MultiLangService {
  private readonly translateService = inject(TranslateService);

  private readonly languageSubject = new BehaviorSubject<string>(resolveInitialLanguage());
  readonly language$ = this.languageSubject.asObservable();

  readonly languageSignal = signal<Lang>(resolveInitialLanguage());

  constructor() {
    effect(() => {
      const lang = this.languageSignal();

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lang));
      } catch {
        /* private mode: the choice just won't persist */
      }

      this.translateService.use(lang);
      this.languageSubject.next(lang);

      // Keep the document in sync. Without this the page stayed lang="en"
      // forever: screen readers announced Spanish copy with English
      // pronunciation rules, and crawlers indexed it as the wrong language.
      document.documentElement.lang = lang;
    });
  }

  updateLanguage(lang: string): void {
    this.languageSignal.set(lang === 'es' ? 'es' : 'en');
  }
}
