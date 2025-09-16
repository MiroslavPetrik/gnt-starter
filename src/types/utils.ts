import type { ReactNode } from "react";

export type RenderProp<Props = unknown, PropName extends string = 'children'> = Record<PropName, (props: Props) => ReactNode>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
// eslint-disable-next-line @typescript-eslint/ban-types
} & {};