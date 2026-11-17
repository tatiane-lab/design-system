import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Common page chrome: title, lead paragraph and content. */
@Component({
  selector: 'app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="page">
      <h1>{{ heading() }}</h1>
      <p class="lead">{{ lead() }}</p>
      <ng-content />
    </article>
  `,
  styles: `
    .page { display: flex; flex-direction: column; gap: var(--ui-space-6); max-width: 54rem; }
    h1 { margin: 0; font-size: 2rem; }
    .lead { margin: 0; color: var(--ui-text-muted); font-size: var(--ui-font-size-lg); max-width: 60ch; }
    :host ::ng-deep h2 { margin: var(--ui-space-4) 0 0; font-size: 1.35rem; }
  `,
})
export class PageComponent {
  readonly heading = input.required<string>();
  readonly lead = input('');
}
