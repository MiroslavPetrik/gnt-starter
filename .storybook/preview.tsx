import type { Preview } from "@storybook/nextjs";

import "@/styles/globals.css";
import * as inter from "@/styles/font/inter";

import { decorateWithGlobalFont } from "./decorateWithGlobalFont";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    nextjs: {
      // https://storybook.js.org/docs/get-started/frameworks/nextjs?renderer=react#set-nextjsappdirectory-to-true
      appDirectory: true,
    },
  },
  decorators: [decorateWithGlobalFont(inter)],
};

export default preview;
