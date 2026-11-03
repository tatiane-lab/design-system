import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SwitchComponent), multi: true },
  ],
  template: `
    <button
      type="button"
      role="switch"
      class="track"
      [attr.aria-checked]="checked()"
      [disabled]="isDisabled()"
      (click)="toggle()"
      (blur)="onTouched()"
    >
      <span class="thumb"></span>
    </button>
    <span class="text" (click)="toggle()"><ng-content /></span>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: var(--ui-space-2); font-family: var(--ui-font-sans); color: var(--ui-text); font-size: var(--ui-font-size-md); }
    .track {
      position: relative; width: 2.5rem; height: 1.5rem; padding: 0; border-radius: var(--ui-radius-full);
      border: 1px solid var(--ui-border-strong); background: var(--ui-surface-muted); cursor: pointer;
      transition: background var(--ui-duration);
    }
    .thumb {
      position: absolute; top: 2px; left: 2px; width: 1.1rem; height: 1.1rem; border-radius: 50%;
      background: var(--ui-text-muted); transition: transform var(--ui-duration), background var(--ui-duration);
    }
    .track[aria-checked='true'] { background: var(--ui-color-primary); border-color: var(--ui-color-primary); }
    .track[aria-checked='true'] .thumb { transform: translateX(1rem); background: var(--ui-color-primary-contrast); }
    .track:focus-visible { outline: 3px solid var(--ui-focus-ring); outline-offset: 2px; }
    .track:disabled { opacity: 0.55; cursor: not-allowed; }
    .text { cursor: pointer; }
  `,
})
export class SwitchComponent implements ControlValueAccessor {
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
  protected toggle(): void {
    if (this.isDisabled()) return;
    const v = !this.checked();
    this.checked.set(v);
    this.onChange(v);
  }
}
