import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-props-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scroll" tabindex="0" role="region" aria-label="Tabela de API (rolável)">
      <table>
        <caption class="sr-only">{{ caption() }}</caption>
        <thead>
          <tr><th scope="col">Nome</th><th scope="col">Tipo</th><th scope="col">Padrão</th><th scope="col">Descrição</th></tr>
        </thead>
        <tbody>
          @for (r of rows(); track r.name) {
            <tr>
              <th scope="row"><code>{{ r.name }}</code></th>
              <td><code>{{ r.type }}</code></td>
              <td>@if (r.default) { <code>{{ r.default }}</code> } @else { - }</td>
              <td>{{ r.description }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .scroll { overflow-x: auto; border: 1px solid var(--ui-border); border-radius: var(--ui-radius-lg); background: var(--ui-surface); }
    table { width: 100%; border-collapse: collapse; font-size: var(--ui-font-size-sm); min-width: 36rem; }
    th, td { text-align: left; padding: var(--ui-space-3) var(--ui-space-4); border-bottom: 1px solid var(--ui-border); vertical-align: top; }
    thead th { background: var(--ui-surface-muted); }
    tbody tr:last-child > * { border-bottom: 0; }
    tbody th { font-weight: 500; }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  `,
})
export class PropsTableComponent {
  readonly rows = input.required<PropRow[]>();
  readonly caption = input('API do componente');
}
