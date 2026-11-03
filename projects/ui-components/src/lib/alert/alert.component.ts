import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, model } from '@angular/core';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'ui-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="alert" [attr.role]="role()" [attr.data-tone]="tone()">
        <div class="body">
          @if (heading()) {
            <strong class="heading">{{ heading() }}</strong>
          }
          <ng-content />
        </div>
        @if (dismissible()) {
          <button type="button" class="close" aria-label="Dispensar" (click)="visible.set(false)">&times;</button>
        }
      </div>
    }
  `,
  styles: `
    :host { display: block; font-family: var(--ui-font-sans); }
    .alert {
      display: flex; gap: var(--ui-space-3); justify-content: space-between; align-items: flex-start;
      padding: var(--ui-space-3) var(--ui-space-4); border-radius: var(--ui-radius-md);
      border: 1px solid currentColor; font-size: var(--ui-font-size-md);
      background: var(--ui-tint-info); color: var(--ui-color-info);
    }
    .alert[data-tone='success'] { background: var(--ui-tint-success); color: var(--ui-color-success); }
    .alert[data-tone='warning'] { background: var(--ui-tint-warning); color: var(--ui-color-warning); }
    .alert[data-tone='danger'] { background: var(--ui-tint-danger); color: var(--ui-color-danger); }
    .body { color: var(--ui-text); display: flex; flex-direction: column; gap: 2px; }
    .close { background: none; border: 0; font-size: 1.4rem; line-height: 1; color: var(--ui-text-muted); cursor: pointer; border-radius: var(--ui-radius-sm); }
    .close:focus-visible { outline: 3px solid var(--ui-focus-ring); }
  `,
})
export class AlertComponent {
  readonly tone = input<AlertTone>('info');
  readonly heading = input('');
  readonly dismissible = input(false, { transform: booleanAttribute });
  readonly visible = model(true);
  /** Erros interrompem leitores de tela; os demais tons são mensagens de status educadas. */
  protected readonly role = computed(() => (this.tone() === 'danger' ? 'alert' : 'status'));
}
