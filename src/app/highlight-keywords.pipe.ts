import { Pipe, PipeTransform } from '@angular/core';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Pipe({
  name: 'highlightKeywords',
  standalone: true,
})
export class HighlightKeywordsPipe implements PipeTransform {
  private cache = new Map<string, RegExp>();

  transform(value: string, keywords: string[]): string {
    if (!value || !keywords?.length) {
      return value;
    }

    return value.replace(
      this.patternFor(keywords),
      (_match, before: string, word: string) => `${before}<strong>${word}</strong>`
    );
  }

  /**
   * One alternation pass instead of one pass per keyword.
   *
   * Replacing keyword-by-keyword meant a later keyword could match text an
   * earlier pass had already wrapped — "Spring Boot" followed by "Spring"
   * produced nested <strong> tags. Sorting longest-first in a single pass lets
   * the most specific keyword win and never revisits inserted markup.
   */
  private patternFor(keywords: string[]): RegExp {
    const key = keywords.join(' ');
    const cached = this.cache.get(key);
    if (cached) {
      cached.lastIndex = 0;
      return cached;
    }

    const alternation = [...keywords]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join('|');

    // \b misbehaves next to non-word characters ("CI/CD", a bare "C"), so the
    // left boundary is captured explicitly. A capture rather than a lookbehind
    // keeps this working on Safari below 16.4, where lookbehind throws.
    const pattern = new RegExp(`(^|[^\\w-])(${alternation})(?![\\w-])`, 'gi');
    this.cache.set(key, pattern);
    return pattern;
  }
}
