import { effect, Injectable, signal } from '@angular/core';
import { windowWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkModeSignal = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') || 'false')
  );

  toggleDarkMode() {
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.add('duration-300');
    this.darkModeSignal.update(value => !value);

    setTimeout(() => {
      document.documentElement.classList.remove('transition-colors');
      document.documentElement.classList.remove('duration-300');
    }, 300);
  }

  constructor() {
    effect(() => {
      localStorage.setItem('darkMode', JSON.stringify(this.darkModeSignal()));
      document.documentElement.classList.toggle('dark', this.darkModeSignal());
    });
  }
}