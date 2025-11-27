import { redirect } from "next/navigation";
import { Action } from "react-form-action/client";

import { translate } from "@/i18n";
import { api } from "@/trpc/server";
import { PageHeader } from "@/app/_components/page-header";

import { sendPasswordResetEmail } from "./action";
import { PasswordResetEmailForm } from "./form";

export default async function PasswordPage() {
  const user = await api.user.getCurrentUser();

  if (!user?.email) {
    redirect("/");
  }

  const { t } = await translate("settings", { keyPrefix: "password" });

  const sendCurrentUserPasswordResetEmail = sendPasswordResetEmail.bind(
    null,
    user.email.address,
  );

  return (
    <Action action={sendCurrentUserPasswordResetEmail} initialData={undefined}>
      <PageHeader>{t("title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700">
        {t("message", { email: user.email.address })}
      </p>
      <PasswordResetEmailForm />
    </Action>
  );
}
