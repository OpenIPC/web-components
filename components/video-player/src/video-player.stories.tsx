import type { Meta, StoryObj } from '@storybook/preact';
import OIPCVideoPlayer from './Video-player';

const meta = {
  component: OIPCVideoPlayer,
  title: 'Components/OIPCVideoPlayer',
} satisfies Meta<typeof OIPCVideoPlayer>;

export default meta;

type Story = StoryObj<typeof OIPCVideoPlayer>;

export const OIPCVideoPlayerStory = {
  args: {
    src: '83e6276dc44186f55ccf8f36a1c0892e83705253',
    mode: '',
  },
} satisfies Story;
