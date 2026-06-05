import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <span class="btn-content">
      @if (loading) {
        <span class="spinner" aria-hidden="true"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
  host: {
    role: 'button',
    '[attr.aria-disabled]': 'disabled || loading',
    '[attr.aria-busy]': 'loading',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[class]': '"btn btn--" + variant + " btn--" + size',
    '[class.btn--disabled]': 'disabled || loading',
    '[class.btn--loading]': 'loading',
    '[class.btn--icon-only]': 'iconOnly',
  },
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconOnly = false;
  @Input('aria-label') ariaLabel = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.clicked.emit(event);
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event as unknown as MouseEvent);
    }
  }
}
