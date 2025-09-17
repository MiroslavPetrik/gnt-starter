import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    // https://storybook.js.org/blog/storybook-react-server-components/#getting-async-with-it
    experimentalRSC: true,
  },
  docs: {},
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
  },
};

export default config;
