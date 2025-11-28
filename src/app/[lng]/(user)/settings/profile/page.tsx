import { redirect } from "next/navigation";
import { Action } from "react-form-action/client";

import { api } from "@/trpc/server";
import { translate } from "@/i18n";
import { PageHeader } from "@/components/page-header";

import { UpdateUserForm } from "./form";
import { updateUser } from "./action";

export default async function ProfilePage() {
  const user = await api.user.getCurrentUser();
  if (!user) {
    redirect("/");
  }
  const { t } = await translate("settings", { keyPrefix: "editProfile" });

  return (
    <Action action={updateUser} initialData={undefined}>
      <PageHeader>{t("title")}</PageHeader>
      <div className="w-full max-w-xs">
        <UpdateUserForm user={user} />
      </div>
    </Action>
  );
}
