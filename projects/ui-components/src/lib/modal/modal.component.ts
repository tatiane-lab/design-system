import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  model,
  viewChild,
} from '@angular/core';

let nextId = 0;

/**
 * Modal baseado no elemento nativo `<dialog>`: o navegador cuida do focus trap,
 * do fundo inerte, da tecla Escape e da devolução do foco. Controle com `[(open)]`.
 * Projete as ações do rodapé com `<div slot="footer">`.
 */
@Component({
  selector: 'ui-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      class="ui-modal"
      [attr.aria-labelledby]="titleId"
      [attr.aria-describedby]="bodyId"
      (close)="open.set(false)"
      (click)="onBackdrop($event)"
    >
      <div class="panel">
        <header class="header">
          <h2 [id]="titleId" class="title">{{ title() }}</h2>
          <button type="button" class="close" aria-label="Fechar diálogo" (click)="open.set(false)">&times;</button>
        </header>
        <div [id]="bodyId" class="body"><ng-content /></div>
        <footer class="footer"><ng-content select="[slot=footer]" /></footer>
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      padding: 0; border: 1px solid var(--ui-border); border-radius: var(--ui-radius-lg);
      background: var(--ui-surface); color: var(--ui-text); box-shadow: var(--ui-shadow-lg);
      width: min(32rem, calc(100vw - 2rem)); max-height: calc(100dvh - 2rem);
      font-family: var(--ui-font-sans); overflow: hidden;
    }
    dialog::backdrop { background: rgb(10 12 28 / 60%); }
    dialog[open] { animation: pop var(--ui-duration) ease-out; }
    @keyframes pop { from { opacity: 0; transform: translateY(8px) scale(0.98); } }
    .panel { display: flex; flex-direction: column; max-height: calc(100dvh - 2rem); }
    .header { display: flex; align-items: center; justify-content: space-between; padding: var(--ui-space-4) var(--ui-space-6); border-bottom: 1px solid var(--ui-border); }
    .title { margin: 0; font-size: var(--ui-font-size-lg); }
    .close { border: 0; background: none; font-size: 1.6rem; line-height: 1; color: var(--ui-text-muted); cursor: pointer; border-radius: var(--ui-radius-sm); }
    .close:focus-visible { outline: 3px solid var(--ui-focus-ring); }
    .body { padding: var(--ui-space-6); overflow: auto; color: var(--ui-text-muted); line-height: 1.55; }
    .footer { display: flex; justify-content: flex-end; gap: var(--ui-space-2); padding: var(--ui-space-4) var(--ui-space-6); border-top: 1px solid var(--ui-border); }
    .footer:not(:has(*)) { display: none; }
  `,
})
export class ModalComponent {
  readonly title = input.required<string>();
  readonly open = model(false);

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  protected readonly titleId = `ui-modal-title-${++nextId}`;
  protected readonly bodyId = `ui-modal-body-${nextId}`;

  constructor() {
    effect(() => {
      const wanted = this.open();
      const dialog = this.dialogRef().nativeElement;
      if (wanted && !dialog.open) dialog.showModal();
      else if (!wanted && dialog.open) dialog.close();
    });
  }

  protected onBackdrop(event: MouseEvent): void {
    // Cliques no ::backdrop têm o próprio <dialog> como alvo.
    if (event.target === this.dialogRef().nativeElement) this.open.set(false);
  }
}
