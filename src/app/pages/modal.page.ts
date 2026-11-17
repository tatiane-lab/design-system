import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent, ModalComponent } from 'ui-components';
import { DemoComponent } from '../shared/demo.component';
import { PageComponent } from '../shared/page.component';
import { PropRow, PropsTableComponent } from '../shared/props-table.component';

@Component({
  selector: 'app-modal-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, ModalComponent, ButtonComponent],
  template: `
    <app-page heading="Modal" lead="Construído sobre o elemento dialog nativo: o foco fica preso, a página atrás fica inerte, Escape fecha e o foco volta a quem abriu.">
      <app-demo heading="Diálogo de confirmação" description="Abra e teste Tab, Escape e um clique no fundo." [code]="code">
        <button ui-button type="button" (click)="open.set(true)">Excluir projeto</button>
        <span class="out" aria-live="polite">Última ação: {{ result() }}</span>

        <ui-modal title="Excluir projeto?" [(open)]="open">
          Isso remove permanentemente o projeto e seus dados. Não é possível desfazer.
          <div slot="footer">
            <button ui-button type="button" variant="secondary" (click)="close('cancelada')">Cancelar</button>
            <button ui-button type="button" variant="danger" (click)="close('excluída')">Excluir</button>
          </div>
        </ui-modal>
      </app-demo>
      <h2>API</h2>
      <app-props-table caption="API do Modal" [rows]="rows" />
    </app-page>
  `,
  styles: `.out { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }`,
})
export class ModalPage {
  protected readonly open = signal(false);
  protected readonly result = signal('nenhuma');

  protected close(r: string): void {
    this.result.set(r);
    this.open.set(false);
  }

  protected readonly code = `open = signal(false);

<button ui-button (click)="open.set(true)">Excluir projeto</button>

<ui-modal title="Excluir projeto?" [(open)]="open">
  Isso remove permanentemente o projeto.
  <div slot="footer">
    <button ui-button variant="secondary" (click)="open.set(false)">Cancelar</button>
    <button ui-button variant="danger" (click)="open.set(false)">Excluir</button>
  </div>
</ui-modal>`;

  protected readonly rows: PropRow[] = [
    { name: 'title', type: 'string (obrigatório)', description: 'Título do diálogo; ligado a aria-labelledby.' },
    { name: 'open', type: 'model<boolean>', default: 'false', description: 'Binding bidirecional. Também sincroniza quando o usuário pressiona Escape.' },
    { name: '[slot=footer]', type: 'ng-content', description: 'Ações do rodapé. Oculto quando vazio.' },
  ];
}
