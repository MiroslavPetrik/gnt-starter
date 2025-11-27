import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { translate } from "@/i18n";

import { resetPasswordEmail } from "./action";
import { ResetPasswordEmailForm } from "./form";

export default async function ResetPasswordEmail() {
  const { t } = await translate("auth");

  return (
    <Action action={resetPasswordEmail} initialData="">
      <PageHeader>{t("resetPasswordEmail.title")}</PageHeader>

      <ResetPasswordEmailForm />
    </Action>
  );
}
