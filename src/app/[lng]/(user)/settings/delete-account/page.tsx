import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { translate } from "@/i18n";

import { deleteUser } from "./action";
import { DeleteUserForm } from "./form";

export default async function DeleteAccountPage() {
  const { t } = await translate("settings", {
    keyPrefix: "deleteAccount",
  });

  return (
    <Action action={deleteUser} initialData="">
      <PageHeader>{t("title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700">{t("warningMessage")}</p>
      <DeleteUserForm />
    </Action>
  );
}
