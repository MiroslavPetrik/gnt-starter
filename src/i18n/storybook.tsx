import type { ComponentType } from "react";
import type { StoryContext } from "@storybook/nextjs";
import { cookies } from "@storybook/nextjs/headers.mock";

import { CookiesProvider } from "@/components/cookies-provider";
import { Language } from "./client";
import { i18nCookieName, languages } from "./options";

export function decorateWithLocale(
  Story: ComponentType,
  context: StoryContext,
) {
  const { locale } = context.globals;

  cookies().set(i18nCookieName, locale);

  return (
    <CookiesProvider cookies={cookies().toString()}>
      <Language>
        <Story />
      </Language>
    </CookiesProvider>
  );
}

export const locale = {
  name: "Locale",
  description: "Internationalization locale",
  toolbar: {
    icon: "globe",
    items: [
      { value: "en", title: "English" },
      { value: "sk", title: "Slovak" },
    ] as { value: (typeof languages)[number]; title: string }[],
    showName: true,
  },
};
