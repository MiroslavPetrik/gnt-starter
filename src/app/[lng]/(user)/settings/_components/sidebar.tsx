"use client";

import {
  Sidebar,
  SidebarItems,
  SidebarItemGroup,
} from "flowbite-react/components/Sidebar";
import { useTranslation } from "react-i18next";
import { SidebarLink } from "@/components/sidebar-link";

export const SettingsSidebar = () => {
  const { t } = useTranslation("settings");

  return (
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarLink href="/settings/profile">
            {t("editProfile.title")}
          </SidebarLink>
          <SidebarLink href="/settings/email">{t("email.title")}</SidebarLink>
          <SidebarLink href="/settings/password">
            {t("password.title")}
          </SidebarLink>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarLink href="/settings/delete-account">
            {t("deleteAccount.title")}
          </SidebarLink>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
