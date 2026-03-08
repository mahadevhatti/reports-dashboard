import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-report-modal',
  templateUrl: './add-report-modal.component.html',
})
export class AddReportModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() reportSubmit = new EventEmitter<{ title: string; subtitle: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      subtitle: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get titleInvalid(): boolean {
    const ctrl = this.form.get('title');
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get subtitleInvalid(): boolean {
    const ctrl = this.form.get('subtitle');
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.reportSubmit.emit({
      title: this.form.value.title.trim(),
      subtitle: this.form.value.subtitle.trim(),
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
