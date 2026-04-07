import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit {
  @Input() appScrollAnimate: string = 'fade-in';
  @Input() scrollAnimateDelay: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const element = this.el.nativeElement;
    element.style.opacity = '0';

    if (this.scrollAnimateDelay > 0) {
      element.style.transitionDelay = `${this.scrollAnimateDelay}ms`;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('animate', this.appScrollAnimate);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
  }
}
