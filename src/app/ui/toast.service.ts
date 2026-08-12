import { Injectable, signal } from '@angular/core';

export type ToastTone = 'info' | 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

const DEFAULT_DURATION_MS = 3500;

/**
 * Minimal replacement for MatSnackBar.
 *
 * Angular Material was pulled in for this single notification, which cost the
 * bundle the whole azure-blue prebuilt theme (~70 kB of CSS) plus the Material
 * and CDK runtime. The portfolio needs one transient message; this is it.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  private nextId = 0;
  private readonly timers = new Map<number, number>();

  show(message: string, tone: ToastTone = 'info', duration = DEFAULT_DURATION_MS): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, message, tone }]);

    const timer = window.setTimeout(() => this.dismiss(id), duration);
    this.timers.set(id, timer);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
