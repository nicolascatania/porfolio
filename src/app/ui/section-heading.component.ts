import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

/**
 * The one heading used by every section, so rhythm and hierarchy stay identical
 * across the page. Previously each section hand-rolled its own <h1>/<h2> with
 * slightly different sizes and colours.
 */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [TranslateModule, ScrollAnimateDirective],
  template: `
    <header class="mb-10 sm:mb-14" [class.text-center]="centered">
      <p class="eyebrow" appScrollAnimate="fade">
        <span>{{ index }}</span>
        <span>{{ eyebrowKey | translate }}</span>
      </p>

      <h2
        class="mt-3 font-title text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        appScrollAnimate="up"
        [scrollAnimateDelay]="60"
      >
        {{ titleKey | translate }}
      </h2>

      @if (subtitleKey) {
        <p
          class="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          [class.mx-auto]="centered"
          appScrollAnimate="up"
          [scrollAnimateDelay]="120"
        >
          {{ subtitleKey | translate }}
        </p>
      }
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      /* Centered headings need the eyebrow rule to sit centered too. */
      .text-center .eyebrow {
        justify-content: center;
      }
    `,
  ],
})
export class SectionHeadingComponent {
  /** Two-digit section number, e.g. '01'. */
  @Input({ required: true }) index!: string;
  @Input({ required: true }) eyebrowKey!: string;
  @Input({ required: true }) titleKey!: string;
  @Input() subtitleKey?: string;
  @Input() centered = false;
}
