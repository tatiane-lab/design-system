import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent, ButtonVariant, ButtonSize } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'] satisfies ButtonVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ui-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Click me</ui-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = { args: { variant: 'primary', size: 'md' } };
export const Secondary: Story = { args: { variant: 'secondary', size: 'md' } };
export const Danger: Story = { args: { variant: 'danger', size: 'md' } };
export const Loading: Story = { args: { variant: 'primary', loading: true } };
export const Disabled: Story = { args: { variant: 'primary', disabled: true } };
export const Small: Story = { args: { variant: 'primary', size: 'sm' } };
export const Large: Story = { args: { variant: 'primary', size: 'lg' } };
