import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertComponent, BadgeComponent, ButtonComponent } from 'ui-components';
import { DemoComponent } from '../shared/demo.component';
import { PageComponent } from '../shared/page.component';
import { PropRow, PropsTableComponent } from '../shared/props-table.component';

@Component({
  selector: 'app-badge-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, BadgeComponent],
  template: `
    <app-page heading="Badge" lead="Rótulo compacto para status ou contagens. A cor nunca é o único sinal: inclua sempre texto.">
      <app-demo heading="Tons" [code]="code">
        @for (t of tones; track t) {
          <ui-badge [tone]="t">{{ t }}</ui-badge>
        }
      </app-demo>
      <h2>API</h2>
      <app-props-table caption="Inputs do Badge" [rows]="rows" />
    </app-page>
  `,
})
export class BadgePage {
  protected readonly tones = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;
  protected readonly code = `<ui-badge>neutral</ui-badge>
<ui-badge tone="success">success</ui-badge>
<ui-badge tone="danger">danger</ui-badge>`;
  protected readonly rows: PropRow[] = [
    { name: 'tone', type: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'neutral'", description: 'Tom de cor.' },
  ];
}

@Component({
  selector: 'app-alert-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, AlertComponent, ButtonComponent],
  template: `
    <app-page heading="Alert" lead="Mensagem inline. O tom danger usa role=&quot;alert&quot;; os demais usam role=&quot;status&quot; (educado).">
      <app-demo heading="Tons" [code]="toneCode">
        <div class="stack full">
          <ui-alert tone="info" heading="Atenção">Há uma nova versão disponível.</ui-alert>
          <ui-alert tone="success" heading="Salvo">Suas alterações foram armazenadas.</ui-alert>
          <ui-alert tone="warning" heading="Cuidado">Esta ação afeta todos os membros.</ui-alert>
          <ui-alert tone="danger" heading="Falhou">Não foi possível acessar o servidor.</ui-alert>
        </div>
      </app-demo>
      <app-demo heading="Dispensável" description="O binding bidirecional em visible permite ao pai trazê-lo de volta." [code]="dismissCode">
        <div class="stack full">
          <ui-alert tone="info" dismissible [(visible)]="visible">Você pode dispensar esta mensagem.</ui-alert>
          @if (!visible()) {
            <button ui-button type="button" variant="secondary" size="sm" (click)="visible.set(true)">Mostrar novamente</button>
          }
        </div>
      </app-demo>
      <h2>API</h2>
      <app-props-table caption="Inputs do Alert" [rows]="rows" />
    </app-page>
  `,
  styles: `.full { width: 100%; }`,
})
export class AlertPage {
  protected readonly visible = signal(true);
  protected readonly toneCode = `<ui-alert tone="info" heading="Atenção">Há uma nova versão disponível.</ui-alert>
<ui-alert tone="danger" heading="Falhou">Não foi possível acessar o servidor.</ui-alert>`;
  protected readonly dismissCode = `visible = signal(true);

<ui-alert tone="info" dismissible [(visible)]="visible">Você pode dispensar esta mensagem.</ui-alert>`;
  protected readonly rows: PropRow[] = [
    { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Cor e role ARIA.' },
    { name: 'heading', type: 'string', default: "''", description: 'Título em negrito acima do conteúdo.' },
    { name: 'dismissible', type: 'boolean', default: 'false', description: 'Exibe um botão de fechar.' },
    { name: 'visible', type: 'model<boolean>', default: 'true', description: 'Binding bidirecional da visibilidade.' },
  ];
}
