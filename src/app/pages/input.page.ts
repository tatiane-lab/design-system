import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputComponent } from 'ui-components';
import { DemoComponent } from '../shared/demo.component';
import { PageComponent } from '../shared/page.component';
import { PropRow, PropsTableComponent } from '../shared/props-table.component';

@Component({
  selector: 'app-input-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageComponent, DemoComponent, PropsTableComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
  template: `
    <app-page heading="Input" lead="Campo de texto que implementa ControlValueAccessor, então funciona com reactive forms e ngModel. Os erros são associados via aria-describedby.">
      <app-demo heading="Básico" [code]="basicCode">
        <ui-input class="w" label="Nome completo" placeholder="Ada Lovelace" hint="Como consta no seu documento." />
      </app-demo>

      <app-demo heading="Formulário reativo com validação" description="Saia do campo vazio para ver o erro. O estado vem do FormControl." [code]="formCode">
        <form class="w stack" [formGroup]="form" (ngSubmit)="submit()">
          <ui-input label="E-mail" type="email" required autocomplete="email" formControlName="email" [errorMessage]="emailError()" />
          <div class="row">
            <button ui-button type="submit">Enviar</button>
            <button ui-button type="button" variant="secondary" (click)="form.controls.email.disable()">Desabilitar</button>
            <button ui-button type="button" variant="ghost" (click)="form.reset(); form.controls.email.enable()">Limpar</button>
          </div>
          <p class="out" aria-live="polite">Valor: <code>{{ form.controls.email.value || '(vazio)' }}</code> · {{ form.valid ? 'válido' : 'inválido' }}@if (submitted) { · enviado }</p>
        </form>
      </app-demo>

      <app-demo heading="Desabilitado" [code]="disabledCode">
        <ui-input class="w" label="Campo desabilitado" [formControl]="locked" />
      </app-demo>

      <h2>API</h2>
      <app-props-table caption="Inputs do Input" [rows]="props" />
    </app-page>
  `,
  styles: `
    .w { width: min(100%, 24rem); }
    .out { margin: 0; font-size: var(--ui-font-size-sm); color: var(--ui-text-muted); }
  `,
})
export class InputPage {
  private readonly fb = inject(FormBuilder).nonNullable;
  protected readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });
  protected readonly locked = this.fb.control({ value: 'Valor somente leitura', disabled: true });
  protected submitted = false;

  protected emailError(): string {
    const e = this.form.controls.email.errors;
    return e?.['required'] ? 'O e-mail é obrigatório.' : e?.['email'] ? 'Informe um e-mail válido.' : '';
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    this.submitted = this.form.valid;
  }

  protected readonly basicCode = `<ui-input label="Nome completo" placeholder="Ada Lovelace" hint="Como consta no seu documento." />`;
  protected readonly formCode = `form = fb.group({ email: ['', [Validators.required, Validators.email]] });

<form [formGroup]="form">
  <ui-input label="E-mail" type="email" required
            formControlName="email"
            [errorMessage]="emailError()" />
</form>`;
  protected readonly disabledCode = `locked = new FormControl({ value: 'Valor somente leitura', disabled: true });

<ui-input label="Campo desabilitado" [formControl]="locked" />`;

  protected readonly props: PropRow[] = [
    { name: 'label', type: 'string', default: "''", description: 'Rótulo visível, associado por for/id.' },
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'", default: "'text'", description: 'Tipo nativo do input.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto de placeholder.' },
    { name: 'hint', type: 'string', default: "''", description: 'Texto de apoio, referenciado por aria-describedby.' },
    { name: 'errorMessage', type: 'string', default: "''", description: 'Exibido (role="alert") após o campo ser tocado; define aria-invalid.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Adiciona required e um asterisco visual.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'readonly nativo.' },
    { name: 'autocomplete', type: 'string | null', default: 'null', description: 'Token de autocomplete.' },
    { name: 'focus()', type: 'método', description: 'Move o foco para o campo.' },
  ];
}
