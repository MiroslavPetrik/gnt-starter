"use client";

import { type PropsWithChildren, useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { getOptions, languages } from "./options";
import { setZodErrorMap } from "./zodError";
import { useLngCookie } from "./use-lng-cookie";

const runsOnServerSide = typeof window === "undefined";

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./${language}/${namespace}.json`),
    ),
  )
  .init(
    {
      ...getOptions("global"),
      lng: undefined, // detect the language on client side
      detection: {
        order: ["path", "htmlTag", "cookie", "navigator"],
      },
      preload: runsOnServerSide ? languages : [],
    },
    (_err, t) => {
      setZodErrorMap({ t });
    },
  );

export function Language({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const [lng] = useLngCookie();

  function updateLanguage() {
    if (i18n.resolvedLanguage !== lng) {
      void i18n.changeLanguage(lng);
    }
  }

  if (runsOnServerSide) {
    updateLanguage();
  }

  useEffect(updateLanguage, [lng, i18n]);

  return <>{children}</>;
}
