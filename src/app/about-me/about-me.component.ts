import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';
import { SectionHeadingComponent } from '../ui/section-heading.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, ScrollAnimateDirective, SectionHeadingComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  /**
   * Screening facts, in the order a recruiter checks them. The decorative
   * hobby list that used to sit here answered no question anyone was asking.
   */
  readonly facts = [
    { labelKey: 'about.facts.locationLabel', valueKey: 'about.facts.location' },
    { labelKey: 'about.facts.timezoneLabel', valueKey: 'about.facts.timezone' },
    { labelKey: 'about.facts.languagesLabel', valueKey: 'about.facts.languages' },
    { labelKey: 'about.facts.focusLabel', valueKey: 'about.facts.focus' },
    { labelKey: 'about.facts.currentlyLabel', valueKey: 'about.facts.currently' },
  ];
}
