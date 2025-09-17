import type { Preview } from "@storybook/nextjs";
import "../src/styles/globals.css";

// TODO: Using next/font/google is broken
// TODO: remove preview-head.html once this works
// import {font} from "../src/styles/font"

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    nextjs: {
      // https://storybook.js.org/docs/get-started/frameworks/nextjs?renderer=react#set-nextjsappdirectory-to-true
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="inter-temp-font">
        <Story />
      </div>
    ),
  ],
};

export default preview;
