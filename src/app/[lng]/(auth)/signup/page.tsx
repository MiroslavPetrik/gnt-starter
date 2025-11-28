import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { translate } from "@/i18n";

import { signUp } from "./action";
import { SignUpForm } from "./form";

export default async function SignUp() {
  const { t } = await translate("signup");

  return (
    <Action action={signUp} initialData="">
      <PageHeader>{t("title")}</PageHeader>
      <SignUpForm />
    </Action>
  );
}
