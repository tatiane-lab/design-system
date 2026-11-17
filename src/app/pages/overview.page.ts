import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonComponent } from 'ui-components';
import { PageComponent } from '../shared/page.component';

@Component({
  selector: 'app-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, RouterLink, ButtonComponent, BadgeComponent],
  template: `
    <app-page
      heading="Design system Angular"
      lead="Componentes de UI acessíveis e com temas, construídos com standalone components, signals e OnPush. Cada componente é documentado aqui com exemplos ao vivo e código para copiar."
    >
      <div class="row">
        <a ui-button routerLink="/components/button">Ver componentes</a>
        <a ui-button variant="secondary" routerLink="/tokens">Design tokens</a>
      </div>

      <h2>O que tem aqui</h2>
      <ul class="cards">
        @for (c of cards; track c.path) {
          <li>
            <a [routerLink]="c.path" class="card">
              <strong>{{ c.name }}</strong>
              <span>{{ c.text }}</span>
              @if (c.cva) {
                <ui-badge tone="primary">ControlValueAccessor</ui-badge>
              }
            </a>
          </li>
        }
      </ul>

      <h2>Princípios</h2>
      <ul>
        <li><strong>Nativo primeiro.</strong> Botões são <code>&lt;button&gt;</code>/<code>&lt;a&gt;</code> de verdade e o modal é um <code>&lt;dialog&gt;</code> nativo.</li>
        <li><strong>Tokens, não números mágicos.</strong> Cores, espaçamentos e raios são CSS custom properties; os temas claro e escuro trocam os valores.</li>
        <li><strong>Acessível por padrão.</strong> Foco visível, relações ARIA para erros e dicas, suporte a movimento reduzido.</li>
      </ul>
    </app-page>
  `,
  styles: `
    .cards { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: var(--ui-space-4); }
    .card { display: flex; flex-direction: column; gap: var(--ui-space-2); align-items: flex-start; height: 100%; padding: var(--ui-space-4); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-lg); background: var(--ui-surface); color: var(--ui-text); text-decoration: none; transition: border-color var(--ui-duration), box-shadow var(--ui-duration); }
    .card:hover { border-color: var(--ui-color-primary); box-shadow: var(--ui-shadow-md); }
    .card span { color: var(--ui-text-muted); font-size: var(--ui-font-size-sm); }
  `,
})
export class OverviewPage {
  protected readonly cards = [
    { name: 'Button', path: '/components/button', text: 'Variantes, tamanhos e estados de carregamento e desabilitado.', cva: false },
    { name: 'Input', path: '/components/input', text: 'Campo de texto com rótulo, dica e erro associado.', cva: true },
    { name: 'Checkbox', path: '/components/checkbox', text: 'Controle de formulário booleano.', cva: true },
    { name: 'Switch', path: '/components/switch', text: 'Alternador com role="switch".', cva: true },
    { name: 'Badge', path: '/components/badge', text: 'Rótulos compactos de status.', cva: false },
    { name: 'Alert', path: '/components/alert', text: 'Mensagens inline, que podem ser dispensadas.', cva: false },
    { name: 'Modal', path: '/components/modal', text: 'Diálogo nativo com binding bidirecional de open.', cva: false },
  ];
}
