
import type { LayoutRoutes } from ".next/types/routes";

import type { Prettify } from "./utils";

type LangLayouts = keyof {
  [k in LayoutRoutes as k extends `/[lng]${infer path}`? path : never]: true
};

export type LayoutParams<Route extends LangLayouts = ""> = Prettify<LayoutProps<`/[lng]${Route}`>>;

