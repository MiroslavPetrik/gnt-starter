import type { Preview } from "@storybook/nextjs";
import "../src/styles/globals.css";

import { decorateWithGlobalFont } from "./decorateWithGlobalFont";

import * as inter from "../src/styles/font/inter";

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
