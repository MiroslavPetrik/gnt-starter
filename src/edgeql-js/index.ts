// GENERATED by @edgedb/generate v0.4.1

export * from "./external";
export { createClient } from "edgedb";
import * as $ from "./reflection";
import * as $syntax from "./syntax";
import * as $op from "./operators";
import _std from "./modules/std";
import _cal from "./modules/cal";
import _cfg from "./modules/cfg";
import _ext from "./modules/ext";
import _fts from "./modules/fts";
import _schema from "./modules/schema";
import _sys from "./modules/sys";
import _default from "./modules/default";
import __default_10 from "./modules/_default_10";
import _math from "./modules/math";

const ExportDefault: typeof _std & 
  typeof _default & 
  $.util.OmitDollarPrefixed<typeof $syntax> & 
  typeof $op & {
  "std": typeof _std;
  "cal": typeof _cal;
  "cfg": typeof _cfg;
  "ext": typeof _ext;
  "fts": typeof _fts;
  "schema": typeof _schema;
  "sys": typeof _sys;
  "default": typeof _default;
  "__default": typeof __default_10;
  "math": typeof _math;
} = {
  ..._std,
  ..._default,
  ...$.util.omitDollarPrefixed($syntax),
  ...$op,
  "std": _std,
  "cal": _cal,
  "cfg": _cfg,
  "ext": _ext,
  "fts": _fts,
  "schema": _schema,
  "sys": _sys,
  "default": _default,
  "__default": __default_10,
  "math": _math,
};
const Cardinality = $.Cardinality;
type Cardinality = $.Cardinality;
export type Set<
  Type extends $.BaseType,
  Card extends $.Cardinality = $.Cardinality.Many
> = $.TypeSet<Type, Card>;


export default ExportDefault;
export { Cardinality };
