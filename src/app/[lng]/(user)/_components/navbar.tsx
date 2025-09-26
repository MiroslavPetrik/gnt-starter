import { type LanguageParam, translate } from "@/i18n";
import type { User } from "@/types";
import {
  Avatar,
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";

import { type ReactNode } from "react";
import { NavbarLinks } from "./navbar-links";

type Props = { user: User; signOutButton: ReactNode } & LanguageParam;

export async function Navbar({ lng, user, signOutButton }: Props) {
  const { t } = await translate("global", { lng });

  const links = [
    { name: t("link.dashboard"), href: "/dashboard" },
    { name: t("link.settings"), href: "/settings" },
  ];

  return (
    <BaseNavbar
      fluid
      rounded
      className="sticky start-0 top-0 z-20 w-full border-b border-gray-200 bg-white"
    >
      <NavbarBrand href="/">
        <span className="self-center text-xl font-semibold whitespace-nowrap">
          GNT Starter
        </span>
      </NavbarBrand>
      <div className="flex space-x-4 md:order-2">
        <div className="flex items-center space-x-4">
          <Avatar rounded />
          <span className="font-semibold text-gray-900 hover:text-gray-900">
            {user.name}
          </span>
        </div>
        {signOutButton}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLinks links={links} lng={lng} />
      </NavbarCollapse>
    </BaseNavbar>
  );
}
