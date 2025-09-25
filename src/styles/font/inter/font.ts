import { Inter } from "next/font/google";
import type variable from "./variable";

// Font loaders must be called and assigned to a const in the module scope
export const font = Inter({
  subsets: ["latin"],
  // Font loader values must be explicitly written literals
  // so we use type to match exact value
  variable: "--font-inter" satisfies typeof variable,
});
