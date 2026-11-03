import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true },
  ],
  template: `
    <label class="wrap">
      <input
        type="checkbox"
        class="box"
        [checked]="checked()"
        [disabled]="isDisabled()"
        (change)="onToggle($event)"
        (blur)="onTouched()"
      />
      <span class="text"><ng-content /></span>
    </label>
  `,
  styles: `
    :host { display: inline-flex; font-family: var(--ui-font-sans); color: var(--ui-text); }
    .wrap { display: inline-flex; align-items: center; gap: var(--ui-space-2); cursor: pointer; font-size: var(--ui-font-size-md); }
    .box { width: 1.125rem; height: 1.125rem; margin: 0; accent-color: var(--ui-color-primary); cursor: inherit; }
    .box:focus-visible { outline: 3px solid var(--ui-focus-ring); outline-offset: 2px; }
    .box:disabled, .box:disabled + .text { opacity: 0.55; cursor: not-allowed; }
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  protected readonly checked = signal(false);
  protected readonly isDisabled = signal(false);
  private onChange: (v: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(v: boolean | null): void {
    this.checked.set(!!v);
  }
  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean): void {
    this.isDisabled.set(d);
  }
  protected onToggle(e: Event): void {
    const v = (e.target as HTMLInputElement).checked;
    this.checked.set(v);
    this.onChange(v);
  }
}
