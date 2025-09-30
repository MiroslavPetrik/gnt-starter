import { usePathname } from "next/navigation";
import type { Language } from "./types";
import { useLngCookie } from "./use-lng-cookie";

export function useLngPathname() {
  const pathname = usePathname();

  if (!pathname) {
    throw new Error(
      "The useLngPathname() hook must be used within the Next.js App Router.",
    );
  }

  const [lng] = useLngCookie();

  const prefix = getPathnamePrefix(pathname, lng);

  if (!prefix) {
    return pathname;
  }

  return pathname.slice(prefix.length) || "/";
}

function getPathnamePrefix(pathname: string, lng: Language) {
  const prefix = `/${lng}` as const;

  if (pathname.startsWith(`${prefix}/`) || pathname === prefix) {
    return prefix;
  } else {
    return null;
  }
}
