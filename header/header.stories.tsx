import { Meta, StoryObj } from '@storybook/preact';
import Header from './Header';
import HeaderMenuList from '../header-menu-list';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Design System/Widgets/Header',
  decorators: [
    (Story) => (
      <>
        <div class="bg-brand-blue">
          <Story/>
        </div>
        <div className="min-h-screen bg-crimson">
        </div>
      </>
    ),
  ],
}

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {
};
