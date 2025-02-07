import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { windowWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiLangService {

  translateService = inject(TranslateService);

  languageSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('languageSignal') || '"en"')
);

  updateLanguage(lang: string):void{
    this.languageSignal.update(()=>{
      switch(lang){
        case 'en':
          return 'en';
        case 'es':
          return 'es';
        default:
          return 'en';
      }
    });
  }

  constructor() { 
    effect(()=>{
      window.localStorage.setItem('languageSignal', JSON.stringify(this.languageSignal()));
      this.translateService.use(this.languageSignal());
      console.log(this.languageSignal); //remove after finish testing
    })
  }
}
