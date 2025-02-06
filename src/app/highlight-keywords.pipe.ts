import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightKeywords',
  standalone: true,
})
export class HighlightKeywordsPipe implements PipeTransform {

  transform(value: string, keywords: string[]): string {
    if (!value || !keywords || keywords.length === 0) {
      return value;
    }

    let result = value;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      result = result.replace(regex, match => `<strong>${match}</strong>`);
    });
    return result;
  }
}
