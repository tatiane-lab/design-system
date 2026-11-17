import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent, SwitchComponent } from 'ui-components';
import { DemoComponent } from '../shared/demo.component';
import { PageComponent } from '../shared/page.component';
import { PropRow, PropsTableComponent } from '../shared/props-table.component';

const CVA_ROWS: PropRow[] = [
  { name: 'formControl / formControlName / ngModel', type: 'boolean', description: 'O valor é booleano; funciona com formulários reativos e template-driven.' },
  { name: 'disabled', type: 'estado do FormControl', description: 'Definido via control.disable(); refletido no controle nativo.' },
  { name: 'content', type: 'ng-content', description: 'Texto do rótulo.' },
];

@Component({
  selector: 'app-checkbox-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, CheckboxComponent, ReactiveFormsModule],
  template: `
    <app-page heading="Checkbox" lead="Envolve um checkbox nativo em um label e implementa ControlValueAccessor.">
      <app-demo heading="Ligado a um FormControl" [code]="code">
        <ui-checkbox [formControl]="terms">Aceito os termos</ui-checkbox>
        <span class="out" aria-live="polite">Valor: <code>{{ terms.value }}</code></span>
      </app-demo>
      <app-demo heading="Desabilitado" [code]="disabledCode">
        <ui-checkbox [formControl]="off">Indisponível</ui-checkbox>
      </app-demo>
      <h2>API</h2>
      <app-props-table caption="API do Checkbox" [rows]="rows" />
    </app-page>
  `,
  styles: `.out { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }`,
})
export class CheckboxPage {
  protected readonly terms = new FormControl(false, { nonNullable: true });
  protected readonly off = new FormControl({ value: true, disabled: true });
  protected readonly rows = CVA_ROWS;
  protected readonly code = `terms = new FormControl(false);

<ui-checkbox [formControl]="terms">Aceito os termos</ui-checkbox>`;
  protected readonly disabledCode = `<ui-checkbox [formControl]="off">Indisponível</ui-checkbox>`;
}

@Component({
  selector: 'app-switch-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, SwitchComponent, ReactiveFormsModule],
  template: `
    <app-page heading="Switch" lead="Alternador exposto a tecnologias assistivas como role=&quot;switch&quot; com aria-checked. Também é um ControlValueAccessor.">
      <app-demo heading="Ligado a um FormControl" [code]="code">
        <ui-switch [formControl]="notifications">Notificações por e-mail</ui-switch>
        <span class="out" aria-live="polite">Valor: <code>{{ notifications.value }}</code></span>
      </app-demo>
      <app-demo heading="Desabilitado" [code]="disabledCode">
        <ui-switch [formControl]="off">Bloqueado</ui-switch>
      </app-demo>
      <h2>API</h2>
      <app-props-table caption="API do Switch" [rows]="rows" />
    </app-page>
  `,
  styles: `.out { font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }`,
})
export class SwitchPage {
  protected readonly notifications = new FormControl(true, { nonNullable: true });
  protected readonly off = new FormControl({ value: false, disabled: true });
  protected readonly rows = CVA_ROWS;
  protected readonly code = `notifications = new FormControl(true);

<ui-switch [formControl]="notifications">Notificações por e-mail</ui-switch>`;
  protected readonly disabledCode = `<ui-switch [formControl]="off">Bloqueado</ui-switch>`;
}
