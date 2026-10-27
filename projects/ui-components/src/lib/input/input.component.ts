import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
  ],
  template: `
    @if (label()) {
      <label [for]="inputId" class="label">
        {{ label() }}
        @if (required()) {
          <span aria-hidden="true" class="required">*</span>
        }
      </label>
    }
    <input
      #field
      class="field"
      [id]="inputId"
      [type]="type()"
      [placeholder]="placeholder()"
      [disabled]="isDisabled()"
      [readOnly]="readonly()"
      [required]="required()"
      [attr.autocomplete]="autocomplete()"
      [attr.aria-invalid]="showError() ? 'true' : null"
      [attr.aria-describedby]="describedBy()"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onBlur()"
    />
    @if (showError()) {
      <span [id]="errorId" role="alert" class="message error">{{ errorMessage() }}</span>
    } @else if (hint()) {
      <span [id]="hintId" class="message">{{ hint() }}</span>
    }
  `,
  host: { '[class.is-invalid]': 'showError()', '[class.is-disabled]': 'isDisabled()' },
  styles: `
    :host { display: flex; flex-direction: column; gap: var(--ui-space-1); font-family: var(--ui-font-sans); }
    .label { font-size: var(--ui-font-size-sm); font-weight: 600; color: var(--ui-text); }
    .required { color: var(--ui-color-danger); margin-inline-start: 2px; }
    .field {
      font: inherit; font-size: var(--ui-font-size-md);
      min-height: 2.5rem; padding: 0 var(--ui-space-3);
      border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-md);
      background: var(--ui-surface); color: var(--ui-text);
      transition: border-color var(--ui-duration), box-shadow var(--ui-duration);
    }
    .field::placeholder { color: var(--ui-text-muted); opacity: 0.8; }
    .field:hover:not(:disabled) { border-color: var(--ui-text-muted); }
    .field:focus-visible { outline: 3px solid var(--ui-focus-ring); outline-offset: 1px; border-color: var(--ui-focus-ring); }
    .field:disabled { opacity: 0.55; cursor: not-allowed; background: var(--ui-surface-muted); }
    :host(.is-invalid) .field { border-color: var(--ui-color-danger); }
    .message { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }
    .message.error { color: var(--ui-color-danger); }
  `,
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'>('text');
  readonly hint = input('');
  /** Texto de erro. Exibido depois que o campo for tocado. */
  readonly errorMessage = input('');
  readonly autocomplete = input<string | null>(null);
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });

  private readonly fieldRef = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly inputId = `ui-input-${++nextId}`;
  protected readonly errorId = `${this.inputId}-error`;
  protected readonly hintId = `${this.inputId}-hint`;

  protected readonly value = signal('');
  protected readonly touched = signal(false);
  protected readonly isDisabled = signal(false);

  protected readonly showError = computed(() => this.touched() && !!this.errorMessage());
  protected readonly describedBy = computed(() =>
    this.showError() ? this.errorId : this.hint() ? this.hintId : null,
  );

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }
  protected onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  focus(): void {
    this.fieldRef().nativeElement.focus();
  }
}
