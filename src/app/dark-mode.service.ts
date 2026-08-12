import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'darkMode';

/**
 * Resolves the initial theme with the exact same rule as the inline bootstrap
 * script in index.html. If the two ever disagree the page flashes: the script
 * paints one theme, then Angular boots and repaints the other.
 */
function resolveInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return JSON.parse(stored);
  } catch {
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkModeSignal = signal<boolean>(resolveInitialTheme());

  constructor() {
    effect(() => {
      const isDark = this.darkModeSignal();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
      } catch {
        /* private mode: theme just won't persist */
      }
      document.documentElement.classList.toggle('dark', isDark);
      document
        .querySelector('meta[name="theme-color"]:not([media])')
        ?.setAttribute('content', isDark ? '#0b1220' : '#edf1f6');
    });
  }

  toggleDarkMode(): void {
    // Colour transitions are handled by the scoped rules in styles.scss;
    // the old version bolted Tailwind classes onto <html> on every toggle.
    this.darkModeSignal.update((value) => !value);
  }
}
