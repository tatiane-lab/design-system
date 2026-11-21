# ng-design-system

Biblioteca de componentes Angular acessíveis, com design tokens, tema claro/escuro e um showcase no estilo Storybook (uma página por componente, com playground, variantes, estados, tabela de API e código para copiar).

> Angular 22 · standalone components · signals · `OnPush` · `ControlValueAccessor` · TypeScript estrito

Não há login nem área autenticada neste projeto, então não existem credenciais de demonstração.

## Estrutura

| Pasta | O que é |
|---|---|
| `projects/ui-components` | A **biblioteca** (`@tatiane-lab/ui-components`), empacotada com ng-packagr |
| `projects/ui-components/src/lib/styles/tokens.scss` | Design tokens (CSS custom properties) |
| `src/` | O **showcase** (aplicação Angular) que documenta a biblioteca |

O showcase importa a lib pelo alias `ui-components` (ver `paths` no `tsconfig.json`), diretamente do código-fonte. Assim as mudanças na lib aparecem na hora, sem precisar rebuildar.

## Componentes

| Seletor | Descrição | Acessibilidade |
|---|---|---|
| `button[ui-button]`, `a[ui-button]` | Botão com variantes (`primary`, `secondary`, `ghost`, `danger`), tamanhos e estado `loading` | Elemento nativo; `aria-busy`/`aria-disabled` no loading; foco visível |
| `ui-input` | Campo de texto, `ControlValueAccessor` | `label` associado, `aria-invalid`, `aria-describedby` para dica/erro, erro com `role="alert"` |
| `ui-checkbox` | Checkbox booleano, `ControlValueAccessor` | `<input type="checkbox">` nativo dentro de `label` |
| `ui-switch` | Alternador, `ControlValueAccessor` | `role="switch"` e `aria-checked` |
| `ui-badge` | Rótulo de status em seis tons | Contraste AA nos dois temas |
| `ui-alert` | Mensagem inline, dispensável | `role="alert"` (danger) ou `role="status"` (demais) |
| `ui-modal` | Diálogo com `[(open)]` | `<dialog>` nativo: focus trap, fundo inerte, Escape, `aria-labelledby`/`aria-describedby` |

### Uso

```ts
import { ButtonComponent, InputComponent } from 'ui-components';

@Component({
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  template: `
    <ui-input label="E-mail" type="email" required formControlName="email"
              [errorMessage]="erro()" />
    <button ui-button variant="primary" [loading]="salvando()">Salvar</button>
  `,
})
export class ExemploComponent {}
```

```scss
// estilos globais do app
@use 'ui-components/styles/tokens'; // no repositório: ../projects/ui-components/src/lib/styles/tokens
```

## Design tokens

Todos prefixados com `--ui-`:

- **Cores:** `--ui-color-primary|danger|success|warning|info`, `--ui-surface-page|surface|surface-muted`, `--ui-text`, `--ui-text-muted`, `--ui-border`, `--ui-border-strong`, `--ui-focus-ring`, tintas (`--ui-tint-*`)
- **Espaçamento:** `--ui-space-1` a `--ui-space-8` (base de 4px)
- **Forma e elevação:** `--ui-radius-sm|md|lg|full`, `--ui-shadow-md|lg`
- **Tipografia:** `--ui-font-sans`, `--ui-font-mono`, `--ui-font-size-sm|md|lg`
- **Movimento:** `--ui-duration` (zerado com `prefers-reduced-motion`)

**Tema:** claro por padrão. O escuro vale com `<html data-theme="dark">` ou pela preferência do sistema (`prefers-color-scheme`); `data-theme="light"` força o claro. O showcase tem um botão no cabeçalho que alterna Sistema, Claro e Escuro e persiste a escolha.

## Como rodar

```bash
npm install --legacy-peer-deps   # o Angular 22 ainda tem peers divergentes no ecossistema
npm start                        # showcase em http://localhost:4215
npm run build                    # build da lib (dist/ui-components) + do app (dist/ng-design-system)
npm test                         # testes unitários (Vitest) da lib e do app
```

Para publicar: `npm run build:lib && cd dist/ui-components && npm publish --access public`.

## Decisões de arquitetura

- **Elementos nativos primeiro.** Botão é `<button>`/`<a>`; modal é `<dialog>`. Teclado, foco e semântica vêm do navegador, com menos código e menos bugs de acessibilidade.
- **Signals e `OnPush` em todos os componentes.** Inputs com `input()`/`model()`, estado interno com `signal()`/`computed()`, `viewChild()` no lugar de `@ViewChild`.
- **`ControlValueAccessor` nos controles de formulário** (`ui-input`, `ui-checkbox`, `ui-switch`), compatíveis com reactive forms e `ngModel`, incluindo o estado desabilitado.
- **Estilos por tokens.** Os componentes só usam `var(--ui-*)`; trocar de tema é trocar valores, sem duplicar CSS.
- **Estados via atributos de dados** (`data-variant`, `data-size`, `data-tone`) e seletores `:host([...])`, sem concatenar classes.
- **Bloqueio de clique no loading em fase de captura**, para que o `(click)` do consumidor não dispare enquanto o botão carrega.
- **Showcase com lazy loading** por rota, componentes `DemoComponent` (preview + código copiável) e `PropsTableComponent` reutilizáveis, link "ir para o conteúdo" e navegação responsiva.

## Correções em relação à versão inicial

- O `package.json` misturava `@angular/build`/CLI 21 com Angular 22 e TypeScript 5.9, o que impedia o `npm install`. Alinhado ao 22.3 e TypeScript 6.
- A lib não tinha configuração de build nem API pública; foram adicionados `ng-package.json`, `public-api.ts` e o projeto `ui-components` no `angular.json`.
- O app era só o placeholder do `ng new`. Foi substituído pelo showcase.
- O README anterior citava Storybook, mas ele nunca esteve instalado; a documentação agora é o próprio showcase.
- Os componentes não tinham CSS algum; foram estilizados com tokens.
- O modal anterior não prendia o foco de verdade nem abria/fechava de forma reativa.
