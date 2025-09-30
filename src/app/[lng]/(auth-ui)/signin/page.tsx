import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { translate } from "@/i18n";

import { signIn } from "./action";
import { SignInForm } from "./form";

export default async function SignIn() {
  const { t } = await translate("auth");

  return (
    <Action action={signIn} initialData="">
      <PageHeader>{t("signIn.title")}</PageHeader>
      <SignInForm />
    </Action>
  );
}
