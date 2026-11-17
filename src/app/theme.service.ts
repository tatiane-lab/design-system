import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';
const KEY = 'ds-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.read());
  readonly label = computed(() => ({ light: 'Claro', dark: 'Escuro', system: 'Sistema' })[this.mode()]);

  constructor() {
    effect(() => {
      const mode = this.mode();
      const root = this.doc.documentElement;
      if (mode === 'system') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', mode);
      try {
        localStorage.setItem(KEY, mode);
      } catch {
        /* storage indisponível: o tema continua valendo nesta sessão */
      }
    });
  }

  cycle(): void {
    const order: ThemeMode[] = ['system', 'light', 'dark'];
    this.mode.set(order[(order.indexOf(this.mode()) + 1) % order.length]);
  }

  private read(): ThemeMode {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'light' || v === 'dark' || v === 'system') return v;
    } catch {
      /* ignore */
    }
    return 'system';
  }
}
