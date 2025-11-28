import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { translate } from "@/i18n";

import { resetPasswordEmail } from "./action";
import { ResetPasswordEmailForm } from "./form";

export default async function ResetPasswordEmail() {
  const { t } = await translate("reset-password", { keyPrefix: "email" });

  return (
    <Action action={resetPasswordEmail} initialData={undefined}>
      <PageHeader>{t("title")}</PageHeader>

      <ResetPasswordEmailForm />
    </Action>
  );
}
