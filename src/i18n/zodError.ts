// custom namespace
export const zodErrorNameSpace = "zodError" as const;

// fake t, so i18n parser will extract the keys
export function t(key: `${typeof zodErrorNameSpace}:${string}`) {
  return key;
}
