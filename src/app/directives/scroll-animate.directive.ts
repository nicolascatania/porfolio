import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Reveals an element once it scrolls into view.
 *
 * Usage: <div appScrollAnimate="up" [scrollAnimateDelay]="i * 70">
 *
 * The legacy value names ('slide-up', 'zoom-in', ...) still resolve, so older
 * templates keep working.
 */

const VARIANTS: Record<string, string> = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  zoom: 'zoom',
  fade: 'fade',
  // Legacy aliases.
  'slide-up': 'up',
  'slide-down': 'down',
  'slide-left': 'left',
  'slide-right': 'right',
  'zoom-in': 'zoom',
  'scale-in': 'zoom',
  'fade-in': 'fade',
};

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() appScrollAnimate: string = 'up';
  /** Stagger in ms. Now actually applied — the old code set it on a property
   *  the keyframe animation never read. */
  @Input() scrollAnimateDelay: number = 0;
  /** How much of the element must be visible before it reveals (0–1). */
  @Input() scrollAnimateThreshold: number = 0.12;

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly zone = inject(NgZone);

  private observer?: IntersectionObserver;
  private onTransitionEnd?: () => void;

  ngOnInit(): void {
    const el = this.host.nativeElement as HTMLElement;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // No motion wanted, or no observer available: show it, skip the machinery.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const variant = VARIANTS[this.appScrollAnimate] ?? 'up';
    el.classList.add('reveal', `reveal--${variant}`);

    if (this.scrollAnimateDelay > 0) {
      el.style.transitionDelay = `${this.scrollAnimateDelay}ms`;
    }

    // Keep IntersectionObserver callbacks out of change detection; the only
    // thing they touch is classList.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) {
            return;
          }

          el.classList.add('is-animating', 'is-visible');
          this.observer?.disconnect();
          this.observer = undefined;

          // Drop the compositor hint and the delay once the reveal is done, so
          // later hover transforms are not offset by a stale transition-delay.
          this.onTransitionEnd = () => {
            el.classList.remove('is-animating');
            el.style.transitionDelay = '';
          };
          el.addEventListener('transitionend', this.onTransitionEnd, { once: true });
        },
        { threshold: this.scrollAnimateThreshold, rootMargin: '0px 0px -8% 0px' }
      );

      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.onTransitionEnd) {
      this.host.nativeElement.removeEventListener('transitionend', this.onTransitionEnd);
    }
  }
}
