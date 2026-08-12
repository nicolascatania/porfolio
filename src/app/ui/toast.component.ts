import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <!-- aria-live on the container, not the toast: the region has to exist in
         the DOM before the message lands or screen readers miss it. -->
    <div class="toast-host" role="status" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast--' + toast.tone">
          @switch (toast.tone) {
            @case ('success') {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="toast-icon" aria-hidden="true">
                <path d="M4.5 12.5l5 5 10-11" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            }
            @case ('error') {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="toast-icon" aria-hidden="true">
                <path d="M12 7v6M12 17h.01" stroke-linecap="round" />
                <circle cx="12" cy="12" r="9" stroke-width="1.8" />
              </svg>
            }
            @default {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" class="toast-icon" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" stroke-linecap="round" />
              </svg>
            }
          }

          <span class="toast-message">{{ toast.message }}</span>

          <button type="button" class="toast-close" (click)="toastService.dismiss(toast.id)" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-host {
        position: fixed;
        left: 50%;
        bottom: calc(1.25rem + env(safe-area-inset-bottom));
        z-index: 2000;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: min(26rem, calc(100vw - 2rem));
        transform: translateX(-50%);
        /* The container must not swallow clicks when empty. */
        pointer-events: none;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.85rem 0.9rem 0.85rem 1rem;
        border-radius: 0.9rem;
        border: 1px solid rgb(255 255 255 / 0.1);
        background-color: #0f1b2d;
        color: #f1f5f9;
        box-shadow: 0 18px 40px -18px rgb(0 0 0 / 0.75);
        pointer-events: auto;
        animation: toast-in 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .toast-icon {
        width: 1.15rem;
        height: 1.15rem;
        flex-shrink: 0;
      }

      .toast--success .toast-icon { color: #2fc7d3; }
      .toast--error   .toast-icon { color: #fb7185; }
      .toast--info    .toast-icon { color: #94a3b8; }

      .toast-message {
        flex: 1;
        min-width: 0;
        font-size: 0.9rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }

      .toast-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        flex-shrink: 0;
        border-radius: 0.5rem;
        color: #94a3b8;
        transition: color 0.2s ease, background-color 0.2s ease;
      }

      .toast-close:hover {
        color: #f1f5f9;
        background-color: rgb(255 255 255 / 0.08);
      }

      @keyframes toast-in {
        from { opacity: 0; transform: translateY(14px) scale(0.97); }
        to   { opacity: 1; transform: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        .toast { animation: none; }
      }
    `,
  ],
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
