import { type languages } from "./options";

export type Languages = (typeof languages)[number] | (string & {});

export type LanguageParam = { lng: Languages };
