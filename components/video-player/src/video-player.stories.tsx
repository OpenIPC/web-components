import type { Meta, StoryObj } from "@storybook/preact-vite";
import OIPCVideoPlayer from "./Video-player";

const meta = {
  component: OIPCVideoPlayer,
  title: "Components/OIPCVideoPlayer",
  argTypes: {
    stream: {
      control: "select",
      options: ["83e6276dc44186f55ccf8f36a1c0892e83705253"],
    },
    server: {
      control: "select",
      options: ["89.104.68.154"],
    },
    live: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof OIPCVideoPlayer>;

export default meta;

type Story = StoryObj<typeof OIPCVideoPlayer>;

export const OIPCVideoPlayerStory = {
  args: {
    stream: "83e6276dc44186f55ccf8f36a1c0892e83705253",
    server: "89.104.68.154",
  },
} satisfies Story;
