
import type { AppRoutes } from ".next/types/routes";

import type { Prettify } from "./utils";

type LangRoutes = keyof {
  [k in AppRoutes as k extends `/[lng]${infer path}`? path : never]: true
};

export type Params<Route extends LangRoutes = ""> = Prettify<PageProps<`/[lng]${Route}`>>;

export type SearchParams<T extends string> = {
  searchParams: Promise<{ [key in T]: string | string[] | undefined }>;
};

export type AwaitedSearchParams<T extends SearchParams<string>> = Awaited<
  T["searchParams"]
>;

/**
 * Reads the first value of a search param
 * @param searchParams as returned from (await searchParams)
 * @param key the key of the search param
 * @returns
 */
export function getSearchParam<
  TKey extends string,
  TParams extends SearchParams<TKey>,
>(searchParams: AwaitedSearchParams<TParams>, key: TKey) {
  const value = searchParams[key];

  return {
    [key]:
      typeof value === "object"
        ? value[0]
        : typeof value === "string"
          ? value
          : undefined,
  };
}
