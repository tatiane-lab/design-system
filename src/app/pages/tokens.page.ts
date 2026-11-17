import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageComponent } from '../shared/page.component';

@Component({
  selector: 'app-tokens-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent],
  template: `
    <app-page
      heading="Design tokens"
      lead="Todas as decisões visuais são CSS custom properties com prefixo --ui-. Alterne o tema no cabeçalho: as amostras abaixo mudam porque leem os valores em tempo real."
    >
      <h2>Cores</h2>
      <ul class="swatches">
        @for (t of colors; track t) {
          <li>
            <span class="chip" [style.background]="'var(' + t + ')'"></span>
            <code>{{ t }}</code>
          </li>
        }
      </ul>

      <h2>Espaçamento</h2>
      <ul class="spacing">
        @for (s of spacing; track s) {
          <li><code>{{ s }}</code><span class="bar" [style.width]="'var(' + s + ')'"></span></li>
        }
      </ul>

      <h2>Raio de borda</h2>
      <ul class="swatches">
        @for (r of radii; track r) {
          <li><span class="chip" [style.border-radius]="'var(' + r + ')'" style="background: var(--ui-color-primary)"></span><code>{{ r }}</code></li>
        }
      </ul>

      <h2>Uso</h2>
      <pre class="code"><code>&#64;use 'ui-components/styles/tokens';

.my-card &#123;
  background: var(--ui-surface);
  border-radius: var(--ui-radius-lg);
  padding: var(--ui-space-4);
&#125;</code></pre>
      <p>Force um tema com <code>&lt;html data-theme="dark"&gt;</code> ou <code>"light"</code>; sem o atributo vale a preferência do sistema (<code>prefers-color-scheme</code>).</p>
    </app-page>
  `,
  styles: `
    ul { list-style: none; margin: 0; padding: 0; }
    .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); gap: var(--ui-space-3); }
    .swatches li { display: flex; align-items: center; gap: var(--ui-space-3); }
    .chip { width: 2.5rem; height: 2.5rem; border-radius: var(--ui-radius-md); border: 1px solid var(--ui-border-strong); flex: none; }
    .spacing li { display: flex; align-items: center; gap: var(--ui-space-3); margin-bottom: var(--ui-space-2); }
    .spacing code { width: 8rem; }
    .bar { height: 0.75rem; background: var(--ui-color-primary); border-radius: 2px; }
    .code { padding: var(--ui-space-4); background: var(--ui-surface-muted); border-radius: var(--ui-radius-md); overflow: auto; margin: 0; }
    .code code { background: none; }
  `,
})
export class TokensPage {
  protected readonly colors = [
    '--ui-color-primary', '--ui-color-danger', '--ui-color-success', '--ui-color-warning', '--ui-color-info',
    '--ui-surface-page', '--ui-surface', '--ui-surface-muted', '--ui-text', '--ui-text-muted', '--ui-border', '--ui-border-strong',
  ];
  protected readonly spacing = ['--ui-space-1', '--ui-space-2', '--ui-space-3', '--ui-space-4', '--ui-space-6', '--ui-space-8'];
  protected readonly radii = ['--ui-radius-sm', '--ui-radius-md', '--ui-radius-lg', '--ui-radius-full'];
}
