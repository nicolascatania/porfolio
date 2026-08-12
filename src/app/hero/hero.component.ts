import { Component, ElementRef, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MultiLangService } from '../multi-lang.service';

/** Professional start date at NetOne — the experience line derives from this
 *  so it never goes stale. */
const CAREER_START = new Date(2025, 2, 1);

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 32;
const HOLD_MS = 1500;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly multiLang = inject(MultiLangService);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  private readonly engCv = 'assets/cv/Catania_Nicolas_english_cv.pdf';
  private readonly spaCv = 'assets/cv/Catania_Nicolas_espanol_cv.pdf';

  /** Tech tokens are proper nouns — identical in both locales, so no i18n. */
  readonly stackTokens = [
    'Spring Boot',
    'REST APIs',
    'PostgreSQL',
    'RabbitMQ',
    'Microservices',
    'Docker',
  ];

  readonly typed = signal<string>(this.stackTokens[0]);

  readonly cvToRetrieve = computed(() =>
    this.multiLang.languageSignal() === 'es' ? this.spaCv : this.engCv
  );

  /** Singular/plural/months are separate keys because Spanish and English
   *  break differently, and ngx-translate has no plural rules built in. */
  readonly experienceLabelKey: string;
  readonly experienceParams: { years?: number; months?: number };

  private timer?: number;
  private observer?: IntersectionObserver;
  private tokenIndex = 0;
  private charIndex = this.stackTokens[0].length;
  private deleting = false;

  ngOnInit(): void {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      // Leave the first token rendered statically.
      return;
    }

    // Only animate while the hero is on screen. Otherwise the timer would keep
    // firing change detection for the whole session.
    this.observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? this.start() : this.stop()),
      { threshold: 0 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.stop();
    this.observer?.disconnect();
  }

  constructor() {
    const now = new Date();
    const months = Math.max(
      1,
      (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
        (now.getMonth() - CAREER_START.getMonth())
    );

    if (months < 12) {
      this.experienceLabelKey = 'hero.experienceMonths';
      this.experienceParams = { months };
    } else {
      const years = Math.floor(months / 12);
      this.experienceLabelKey = years === 1 ? 'hero.experienceYear' : 'hero.experienceYears';
      this.experienceParams = { years };
    }
  }

  private start(): void {
    if (this.timer !== undefined) {
      return;
    }
    this.schedule(HOLD_MS);
  }

  private stop(): void {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private schedule(delay: number): void {
    this.timer = window.setTimeout(() => this.tick(), delay);
  }

  private tick(): void {
    this.timer = undefined;
    const token = this.stackTokens[this.tokenIndex];

    if (!this.deleting) {
      if (this.charIndex < token.length) {
        this.charIndex += 1;
        this.typed.set(token.slice(0, this.charIndex));
        this.schedule(TYPE_SPEED_MS);
        return;
      }
      this.deleting = true;
      this.schedule(HOLD_MS);
      return;
    }

    if (this.charIndex > 0) {
      this.charIndex -= 1;
      this.typed.set(token.slice(0, this.charIndex));
      this.schedule(DELETE_SPEED_MS);
      return;
    }

    this.deleting = false;
    this.tokenIndex = (this.tokenIndex + 1) % this.stackTokens.length;
    this.schedule(TYPE_SPEED_MS);
  }
}
