import { Pipe, PipeTransform } from '@angular/core';

/**
 * Splits a translated block into its individual lines.
 *
 * The experience/education copy in the i18n files separates achievements with
 * "\n", but those were rendered through [innerHTML], where a newline collapses
 * to a single space — so eight distinct bullet points were displayed as one
 * unbroken paragraph. Splitting here lets the template render a real list.
 */
@Pipe({
  name: 'splitLines',
  standalone: true,
})
export class SplitLinesPipe implements PipeTransform {
  transform(value: string | null | undefined): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
}
