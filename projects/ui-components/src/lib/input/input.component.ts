import {
  Component,
  Input,
  forwardRef,
  signal,
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="input-wrapper" [class.input-wrapper--error]="hasError()" [class.input-wrapper--focused]="focused()">
      @if (label) {
        <label [attr.for]="inputId" class="input-label">
          {{ label }}
          @if (required) { <span aria-hidden="true" class="required-mark">*</span> }
        </label>
      }

      <div class="input-container">
        <input
          #inputRef
          [id]="inputId"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="isDisabled()"
          [attr.aria-required]="required"
          [attr.aria-invalid]="hasError()"
          [attr.aria-describedby]="errorId"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="focused.set(true)"
          class="input-field"
        />
      </div>

      @if (hasError() && errorMessage) {
        <span [id]="errorId" role="alert" class="input-error">
          {{ errorMessage }}
        </span>
      }

      @if (hint && !hasError()) {
        <span class="input-hint">{{ hint }}</span>
      }
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() required = false;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  private static idCounter = 0;
  inputId = `ui-input-${++InputComponent.idCounter}`;
  errorId = `${this.inputId}-error`;

  value = signal('');
  focused = signal(false);
  touched = signal(false);
  isDisabled = signal(false);

  hasError = computed(() => this.touched() && !!this.errorMessage);

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
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

  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  onBlur() {
    this.focused.set(false);
    this.touched.set(true);
    this.onTouched();
  }

  focus() {
    this.inputRef.nativeElement.focus();
  }
}
