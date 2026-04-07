import { Component, OnDestroy } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

const COOLDOWN_KEY = 'portfolio-contact-cooldown';
const COOLDOWN_MINUTES = 10;
const MIN_SUBMIT_DELAY_MS = 3000;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {
  email: string = 'devcatania@gmail.com';
  contactForm: FormGroup;
  cooldownExpiresAt = 0;
  isSubmitting = false;
  formCreatedAt = Date.now();
  spamWarning = '';

  private cooldownTimer?: number;

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    emailjs.init(environment.emailjs.publicKey); // Initialize EmailJS with public key from environment

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(900)]],
      nickname: ['']
    });

    this.loadCooldown();
    this.startCooldownTimer();
  }

  ngOnDestroy(): void {
    if (this.cooldownTimer) {
      window.clearInterval(this.cooldownTimer);
    }
  }

  get remainingCooldown(): string {
    if (!this.isCooldownActive) {
      return '';
    }

    const seconds = Math.max(0, Math.ceil((this.cooldownExpiresAt - Date.now()) / 1000));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${remainder.toString().padStart(2, '0')}`;
  }

  get isCooldownActive(): boolean {
    return Date.now() < this.cooldownExpiresAt;
  }

  get canSubmit(): boolean {
    return this.contactForm.valid && !this.isCooldownActive && !this.isSubmitting;
  }

  copyEmail(): void {
    this.clipboard.copy(this.email);
    const message = this.translate.instant('contactInfo.copySuccess');
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  submitContactForm(): void {
    this.spamWarning = '';

    if (this.isCooldownActive) {
      this.snackBar.open(this.translate.instant('contactInfo.cooldownMessage', { time: this.remainingCooldown }), '', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    if (this.contactForm.get('nickname')?.value) {
      this.spamWarning = this.translate.instant('contactInfo.spamDetected');
      return;
    }

    if (Date.now() - this.formCreatedAt < MIN_SUBMIT_DELAY_MS) {
      this.spamWarning = this.translate.instant('contactInfo.tooFastWarning');
      return;
    }

    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.value;

    this.isSubmitting = true;

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formValue.name,
      from_email: formValue.email,
      subject: formValue.subject,
      message: formValue.message,
      to_email: this.email
    };

    emailjs.send(environment.emailjs.serviceId, environment.emailjs.templateId, templateParams)
      .then((response: any) => {
        console.log('Email sent successfully!', response.status, response.text);
        this.startCooldown();
        this.contactForm.reset();
        this.formCreatedAt = Date.now();
        this.snackBar.open(this.translate.instant('contactInfo.sendSuccess'), '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      })
      .catch((error: any) => {
        console.error('Failed to send email:', error);
        this.snackBar.open(this.translate.instant('contactInfo.sendError'), '', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  private loadCooldown(): void {
    const stored = localStorage.getItem(COOLDOWN_KEY);
    if (stored) {
      const value = Number(stored);
      if (!Number.isNaN(value) && value > Date.now()) {
        this.cooldownExpiresAt = value;
      }
    }
  }

  private startCooldown(): void {
    this.cooldownExpiresAt = Date.now() + COOLDOWN_MINUTES * 60 * 1000;
    localStorage.setItem(COOLDOWN_KEY, this.cooldownExpiresAt.toString());
  }

  private startCooldownTimer(): void {
    this.cooldownTimer = window.setInterval(() => {
      if (this.cooldownExpiresAt && Date.now() >= this.cooldownExpiresAt) {
        this.cooldownExpiresAt = 0;
        if (this.cooldownTimer) {
          window.clearInterval(this.cooldownTimer);
        }
      }
    }, 1000);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return this.translate.instant('contactInfo.validation.required');
    }
    if (field.errors['minlength']) {
      return this.translate.instant('contactInfo.validation.minLength', {min: field.errors['minlength'].requiredLength});
    }
    if (field.errors['maxlength']) {
      return this.translate.instant('contactInfo.validation.maxLength', {max: field.errors['maxlength'].requiredLength});
    }
    if (field.errors['email']) {
      return this.translate.instant('contactInfo.validation.email');
    }
    if (field.errors['pattern']) {
      return this.translate.instant('contactInfo.validation.invalidFormat');
    }

    return '';
  }
}
