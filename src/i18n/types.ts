import { type languages } from "./options";

// eslint-disable-next-line @typescript-eslint/ban-types
export type Languages = (typeof languages)[number] | (string & {});

export type LanguageParam = { lng: Languages };
