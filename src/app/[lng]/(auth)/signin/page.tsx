import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { translate } from "@/i18n";

import { signIn } from "./action";
import { SignInForm } from "./form";

export default async function SignIn() {
  const { t } = await translate("signin");

  return (
    <Action action={signIn} initialData={undefined}>
      <PageHeader>{t("title")}</PageHeader>
      <SignInForm />
    </Action>
  );
}
