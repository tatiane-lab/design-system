import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'ui-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: { '[attr.data-tone]': 'tone()' },
  styles: `
    :host {
      display: inline-flex; align-items: center; padding: 2px var(--ui-space-2);
      border-radius: var(--ui-radius-full); font: 600 var(--ui-font-size-sm) / 1.4 var(--ui-font-sans);
      background: var(--ui-surface-muted); color: var(--ui-text);
    }
    :host([data-tone='primary']) { background: var(--ui-tint-primary); color: var(--ui-color-primary); }
    :host([data-tone='success']) { background: var(--ui-tint-success); color: var(--ui-color-success); }
    :host([data-tone='warning']) { background: var(--ui-tint-warning); color: var(--ui-color-warning); }
    :host([data-tone='danger']) { background: var(--ui-tint-danger); color: var(--ui-color-danger); }
    :host([data-tone='info']) { background: var(--ui-tint-info); color: var(--ui-color-info); }
  `,
})
export class BadgeComponent {
  readonly tone = input<BadgeTone>('neutral');
}
