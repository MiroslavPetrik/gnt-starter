import { type languages } from "./options";

export type Language = (typeof languages)[number] | (string & {});

export type LanguageParam = { lng: Language };
