import { ChangeDetectionStrategy, Component, ElementRef, booleanAttribute, inject, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Botão estilizado sobre elementos nativos: teclado, formulário e semântica de link vêm de graça.
 * Uso: `<button ui-button variant="primary">Salvar</button>` ou `<a ui-button href="/">Link</a>`.
 */
@Component({
  selector: 'button[ui-button], a[ui-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <span class="spinner" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  host: {
    class: 'ui-button',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-icon-only]': 'iconOnly() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'loading() ? "true" : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--ui-space-2);
      font: 600 var(--ui-font-size-md) / 1 var(--ui-font-sans);
      border: 1px solid transparent;
      border-radius: var(--ui-radius-md);
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      min-height: 2.5rem;
      padding: 0 var(--ui-space-4);
      transition: background var(--ui-duration), border-color var(--ui-duration), opacity var(--ui-duration);
      background: var(--ui-color-primary);
      color: var(--ui-color-primary-contrast);
    }
    :host(:hover) { background: var(--ui-color-primary-hover); }
    :host(:focus-visible) { outline: 3px solid var(--ui-focus-ring); outline-offset: 2px; }
    :host([data-variant='secondary']) {
      background: var(--ui-surface);
      color: var(--ui-text);
      border-color: var(--ui-border-strong);
    }
    :host([data-variant='secondary']:hover) { background: var(--ui-surface-muted); }
    :host([data-variant='ghost']) { background: transparent; color: var(--ui-color-primary); }
    :host([data-variant='ghost']:hover) { background: var(--ui-tint-primary); }
    :host([data-variant='danger']) { background: var(--ui-color-danger); color: #fff; }
    :host([data-variant='danger']:hover) { background: var(--ui-color-danger-hover); }
    :host([data-size='sm']) { min-height: 2rem; padding: 0 var(--ui-space-3); font-size: var(--ui-font-size-sm); }
    :host([data-size='lg']) { min-height: 3rem; padding: 0 var(--ui-space-6); font-size: var(--ui-font-size-lg); }
    :host([data-icon-only]) { padding: 0; aspect-ratio: 1; }
    :host([disabled]), :host([aria-disabled='true']) { opacity: 0.55; cursor: not-allowed; }
    :host([aria-busy='true']) { cursor: progress; }
    .spinner {
      width: 1em; height: 1em; border-radius: 50%;
      border: 2px solid currentColor; border-right-color: transparent;
      animation: spin 700ms linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2s; } }
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });

  constructor() {
    // Fase de captura: o guard roda antes de qualquer listener (click) do consumidor.
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.addEventListener('click', (e) => this.guard(e), true);
  }

  private guard(event: Event): void {
    if (this.loading() || this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
