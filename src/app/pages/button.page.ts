import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonVariant } from 'ui-components';
import { DemoComponent } from '../shared/demo.component';
import { PageComponent } from '../shared/page.component';
import { PropRow, PropsTableComponent } from '../shared/props-table.component';

@Component({
  selector: 'app-button-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, ButtonComponent],
  template: `
    <app-page heading="Button" lead="Aplica-se a elementos button e a nativos, então formulários, links e teclado funcionam sem handlers customizados.">
      <app-demo heading="Playground" description="Altere as props e copie o código gerado." [code]="playgroundCode()">
        <div class="controls">
          <label class="control">Variante
            <select (change)="variant.set(val($event, 'primary'))">
              @for (v of variants; track v) { <option [value]="v" [selected]="v === variant()">{{ v }}</option> }
            </select>
          </label>
          <label class="control">Tamanho
            <select (change)="size.set(val($event, 'md'))">
              @for (s of sizes; track s) { <option [value]="s" [selected]="s === size()">{{ s }}</option> }
            </select>
          </label>
          <label class="check"><input type="checkbox" (change)="loading.set(checked($event))" /> loading</label>
          <label class="check"><input type="checkbox" (change)="disabled.set(checked($event))" /> disabled</label>
        </div>
        <div class="stage">
          <button ui-button type="button" [variant]="variant()" [size]="size()" [loading]="loading()" [disabled]="disabled()" (click)="clicks.set(clicks() + 1)">
            Clique aqui
          </button>
          <span class="sr-live" aria-live="polite">Cliques: {{ clicks() }}</span>
        </div>
      </app-demo>

      <app-demo heading="Variantes" [code]="variantsCode">
        @for (v of variants; track v) {
          <button ui-button type="button" [variant]="v">{{ v }}</button>
        }
      </app-demo>

      <app-demo heading="Tamanhos" [code]="sizesCode">
        @for (s of sizes; track s) {
          <button ui-button type="button" [size]="s">Tamanho {{ s }}</button>
        }
      </app-demo>

      <app-demo heading="Estados" description="O loading mantém o foco e define aria-busy; disabled usa o atributo nativo." [code]="statesCode">
        <button ui-button type="button" loading>Salvando</button>
        <button ui-button type="button" disabled>Desabilitado</button>
        <a ui-button variant="secondary" href="https://angular.dev" target="_blank" rel="noopener">Como link</a>
      </app-demo>

      <h2>API</h2>
      <app-props-table caption="Inputs do Button" [rows]="props" />
    </app-page>
  `,
  styles: `
    .controls { display: flex; flex-wrap: wrap; gap: var(--ui-space-4); width: 100%; align-items: end; }
    .check { display: flex; gap: var(--ui-space-2); align-items: center; font-size: var(--ui-font-size-sm); font-weight: 600; min-height: 2.25rem; }
    .stage { width: 100%; display: flex; align-items: center; gap: var(--ui-space-4); padding: var(--ui-space-4); background: var(--ui-surface-muted); border-radius: var(--ui-radius-md); }
    .sr-live { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }
  `,
})
export class ButtonPage {
  protected readonly variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
  protected readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];
  protected readonly variant = signal<ButtonVariant>('primary');
  protected readonly size = signal<ButtonSize>('md');
  protected readonly loading = signal(false);
  protected readonly disabled = signal(false);
  protected readonly clicks = signal(0);

  protected readonly playgroundCode = computed(() => {
    const attrs = [
      this.variant() !== 'primary' ? ` variant="${this.variant()}"` : '',
      this.size() !== 'md' ? ` size="${this.size()}"` : '',
      this.loading() ? ' loading' : '',
      this.disabled() ? ' disabled' : '',
    ].join('');
    return `<button ui-button type="button"${attrs}>Clique aqui</button>`;
  });

  protected readonly variantsCode = `<button ui-button variant="primary">primary</button>
<button ui-button variant="secondary">secondary</button>
<button ui-button variant="ghost">ghost</button>
<button ui-button variant="danger">danger</button>`;
  protected readonly sizesCode = `<button ui-button size="sm">Tamanho sm</button>
<button ui-button size="md">Tamanho md</button>
<button ui-button size="lg">Tamanho lg</button>`;
  protected readonly statesCode = `<button ui-button loading>Salvando</button>
<button ui-button disabled>Desabilitado</button>
<a ui-button variant="secondary" href="https://angular.dev">Como link</a>`;

  protected readonly props: PropRow[] = [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Estilo visual.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura e tamanho da fonte.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Exibe um spinner, define aria-busy e ignora cliques.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Atributo disabled nativo; cliques são ignorados.' },
    { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Botão quadrado. Informe um aria-label.' },
  ];

  protected val<T extends string>(e: Event, _fallback: T): T {
    return (e.target as HTMLSelectElement).value as T;
  }
  protected checked(e: Event): boolean {
    return (e.target as HTMLInputElement).checked;
  }
}
