import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

@Component({
  imports: [ButtonComponent],
  template: `<button ui-button [variant]="variant()" [loading]="loading()" (click)="clicks.set(clicks() + 1)">Salvar</button>`,
})
class HostComponent {
  variant = signal<'primary' | 'danger'>('primary');
  loading = signal(false);
  clicks = signal(0);
}

describe('ButtonComponent', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return { fixture, btn: fixture.nativeElement.querySelector('button') as HTMLButtonElement };
  }

  it('reflete a variante em data-variant', () => {
    const { fixture, btn } = setup();
    expect(btn.dataset['variant']).toBe('primary');
    fixture.componentInstance.variant.set('danger');
    fixture.detectChanges();
    expect(btn.dataset['variant']).toBe('danger');
  });

  it('emite clique normalmente', () => {
    const { fixture, btn } = setup();
    btn.click();
    expect(fixture.componentInstance.clicks()).toBe(1);
  });

  it('ignora cliques e marca aria-busy durante o loading', () => {
    const { fixture, btn } = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    btn.click();
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(fixture.componentInstance.clicks()).toBe(0);
  });
});
