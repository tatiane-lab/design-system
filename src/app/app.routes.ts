import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Overview', loadComponent: () => import('./pages/overview.page').then((m) => m.OverviewPage) },
  { path: 'tokens', title: 'Design tokens', loadComponent: () => import('./pages/tokens.page').then((m) => m.TokensPage) },
  { path: 'components/button', title: 'Button', loadComponent: () => import('./pages/button.page').then((m) => m.ButtonPage) },
  { path: 'components/input', title: 'Input', loadComponent: () => import('./pages/input.page').then((m) => m.InputPage) },
  { path: 'components/checkbox', title: 'Checkbox', loadComponent: () => import('./pages/toggles.page').then((m) => m.CheckboxPage) },
  { path: 'components/switch', title: 'Switch', loadComponent: () => import('./pages/toggles.page').then((m) => m.SwitchPage) },
  { path: 'components/badge', title: 'Badge', loadComponent: () => import('./pages/feedback.page').then((m) => m.BadgePage) },
  { path: 'components/alert', title: 'Alert', loadComponent: () => import('./pages/feedback.page').then((m) => m.AlertPage) },
  { path: 'components/modal', title: 'Modal', loadComponent: () => import('./pages/modal.page').then((m) => m.ModalPage) },
  { path: '**', redirectTo: '' },
];
