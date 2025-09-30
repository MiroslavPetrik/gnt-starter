"use client";

import { NavbarLink } from "flowbite-react";
import Link from "next/link";
import { useLngPathname } from "@/i18n/use-lng-pathname";

export type NavLink = {
  name: string;
  href: string;
};

type Props = { links: NavLink[] };

export const NavbarLinks = ({ links }: Props) => {
  const pathname = useLngPathname();

  return (
    <>
      {links.map(({ name, href }) => (
        <NavbarLink
          key={href}
          as={Link}
          href={href}
          active={pathname.startsWith(href)}
        >
          {name}
        </NavbarLink>
      ))}
    </>
  );
};
