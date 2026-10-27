import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@Component({
  imports: [InputComponent, ReactiveFormsModule],
  template: `<ui-input label="E-mail" hint="Dica" errorMessage="Obrigatório" [formControl]="control" />`,
})
class HostComponent {
  control = new FormControl('inicial', { nonNullable: true });
}

describe('InputComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, input: el.querySelector('input') as HTMLInputElement };
  }

  it('escreve o valor do FormControl no input', async () => {
    const { fixture, input } = setup();
    await fixture.whenStable();
    expect(input.value).toBe('inicial');
  });

  it('propaga a digitação para o FormControl', () => {
    const { fixture, input } = setup();
    input.value = 'novo';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('novo');
  });

  it('associa o label ao input e a dica via aria-describedby', () => {
    const { el, input } = setup();
    expect(el.querySelector('label')?.getAttribute('for')).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toContain('hint');
  });

  it('mostra o erro com aria-invalid depois do blur', () => {
    const { fixture, el, input } = setup();
    expect(input.getAttribute('aria-invalid')).toBeNull();
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('[role=alert]')?.textContent).toContain('Obrigatório');
  });

  it('desabilita o input quando o controle é desabilitado', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
