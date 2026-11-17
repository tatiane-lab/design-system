import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/** Storybook-like story frame: live preview on top, copyable source below. */
@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="demo" [attr.aria-label]="heading()">
      <h3 class="heading">{{ heading() }}</h3>
      @if (description()) {
        <p class="desc">{{ description() }}</p>
      }
      <div class="preview"><ng-content /></div>
      <div class="code-bar">
        <span class="lang">Template Angular</span>
        <button type="button" class="copy" (click)="copy()">
          {{ copied() ? 'Copiado!' : 'Copiar código' }}
        </button>
        <span class="sr-only" aria-live="polite">{{ copied() ? 'Código copiado para a área de transferência' : '' }}</span>
      </div>
      <pre class="code" tabindex="0"><code>{{ code() }}</code></pre>
    </section>
  `,
  styles: `
    .demo { border: 1px solid var(--ui-border); border-radius: var(--ui-radius-lg); background: var(--ui-surface); overflow: hidden; }
    .heading { margin: 0; padding: var(--ui-space-4) var(--ui-space-6) 0; font-size: var(--ui-font-size-lg); }
    .desc { margin: var(--ui-space-1) 0 0; padding: 0 var(--ui-space-6); color: var(--ui-text-muted); }
    .preview { padding: var(--ui-space-6); display: flex; flex-wrap: wrap; gap: var(--ui-space-3); align-items: center; }
    .code-bar { display: flex; justify-content: space-between; align-items: center; padding: var(--ui-space-2) var(--ui-space-4); background: var(--ui-surface-muted); border-top: 1px solid var(--ui-border); }
    .lang { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }
    .copy { font: inherit; font-size: var(--ui-font-size-sm); font-weight: 600; background: var(--ui-surface); color: var(--ui-text); border: 1px solid var(--ui-border-strong); border-radius: var(--ui-radius-sm); padding: 2px var(--ui-space-3); cursor: pointer; }
    .copy:hover { background: var(--ui-tint-primary); }
    .code { margin: 0; padding: var(--ui-space-4) var(--ui-space-6); overflow: auto; background: var(--ui-surface-muted); }
    .code code { background: none; padding: 0; font-size: var(--ui-font-size-sm); white-space: pre; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  `,
})
export class DemoComponent {
  readonly heading = input.required<string>();
  readonly description = input('');
  readonly code = input.required<string>();
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard bloqueado: o código continua selecionável no bloco */
    }
  }
}
