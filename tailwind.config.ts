import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

import { variable } from "./src/styles/font/variable";

export default {
  content: ["./src/**/*.tsx", ".flowbite-react\\class-list.json"],
  theme: {
    extend: { fontFamily: { sans: [`var(${variable})`, ...fontFamily.sans] } },
  },
  plugins: [flowbiteReact],
} satisfies Config;
