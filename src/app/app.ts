import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonComponent } from 'ui-components';
import { ThemeService } from './theme.service';

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly theme = inject(ThemeService);
  protected readonly title = 'ng-design-system';

  protected readonly intro: NavItem[] = [
    { path: '/', label: 'Visão geral' },
    { path: '/tokens', label: 'Design tokens' },
  ];
  protected readonly components: NavItem[] = [
    { path: '/components/button', label: 'Button' },
    { path: '/components/input', label: 'Input' },
    { path: '/components/checkbox', label: 'Checkbox' },
    { path: '/components/switch', label: 'Switch' },
    { path: '/components/badge', label: 'Badge' },
    { path: '/components/alert', label: 'Alert' },
    { path: '/components/modal', label: 'Modal' },
  ];
}
