# Angular Design System

> Angular 22 · `ng generate library` · WCAG 2.2 · Storybook 8 · `ControlValueAccessor` · Semantic Versioning

An accessible Angular component library with Storybook documentation, visual regression tests and npm publication pipeline.

## Components

| Component | Description | ARIA |
|---|---|---|
| `ui-button` | Polymorphic button with variants and loading state | `role="button"`, `aria-disabled`, `aria-busy`, keyboard activation |
| `ui-input` | Form control implementing `ControlValueAccessor` | `aria-required`, `aria-invalid`, `aria-describedby` for errors |
| `ui-modal` | Accessible dialog with focus trap and scroll lock | `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape key |

## Accessibility

- All interactive elements are keyboard-navigable with visible focus indicators (`:focus-visible`)
- Color contrast ratios meet WCAG 2.2 AA (4.5:1 text, 3:1 UI components)
- Screen reader tested with NVDA and VoiceOver
- `@storybook/addon-a11y` runs automated Axe checks in every story

## Tech Stack

| Package | Version |
|---|---|
| `@angular/core` | ^22.3.0 |
| `storybook` | ^8.6.0 |
| `@storybook/angular` | ^8.6.0 |
| `@storybook/addon-a11y` | ^8.6.0 |

## Running Storybook

```bash
npm install
npm run storybook
```

## Publishing

```bash
npm run build:lib
cd dist/ui-components
npm publish --access public
```

Versioning follows [Conventional Commits](https://www.conventionalcommits.org/) with `standard-version` for automatic CHANGELOG generation.
