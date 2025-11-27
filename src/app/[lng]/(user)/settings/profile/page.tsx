import { redirect } from "next/navigation";
import { Action } from "react-form-action/client";

import { api } from "@/trpc/server";
import { translate } from "@/i18n";
import { PageHeader } from "@/app/_components/page-header";

import { UpdateUserForm } from "./form";
import { updateUser } from "./action";

export default async function ProfilePage() {
  const user = await api.user.getCurrentUser();
  if (!user) {
    redirect("/");
  }
  const { t } = await translate("settings");

  return (
    <Action action={updateUser} initialData={undefined}>
      <PageHeader>{t("editProfile.title")}</PageHeader>
      <div className="w-full max-w-xs">
        <UpdateUserForm user={user} />
      </div>
    </Action>
  );
}
