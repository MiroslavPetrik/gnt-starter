"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from "flowbite-react/components/Sidebar";
import { useTranslation } from "react-i18next";
import { useLngPathname } from "@/i18n/use-lng-pathname";

export const SettingsSidebar = () => {
  const pathname = useLngPathname();
  const { t } = useTranslation("settings");

  return (
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            as={Link}
            href="/settings/profile"
            active={pathname.startsWith("/settings/profile")}
          >
            {t("editProfile.title")}
          </SidebarItem>
          <SidebarItem
            as={Link}
            href="/settings/email"
            active={pathname.startsWith("/settings/email")}
          >
            {t("email.title")}
          </SidebarItem>
          <SidebarItem
            as={Link}
            href="/settings/password"
            active={pathname.startsWith("/settings/password")}
          >
            {t("password.title")}
          </SidebarItem>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem
            as={Link}
            href="/settings/delete-account"
            active={pathname.startsWith("/settings/delete-account")}
          >
            {t("deleteAccount.title")}
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
