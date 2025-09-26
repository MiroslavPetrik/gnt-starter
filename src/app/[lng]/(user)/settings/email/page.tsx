"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Stack } from "@/app/_components";

import { resendVerificationEmail } from "./action";
import { EmailForm } from "./form";
import { VerifiedAlert } from "./components/verified-alert";
import { NotVerifiedAlert } from "./components/not-verified-alert";

export default async function Page({ params }: Params) {
  const { lng } = await params;
  const user = await api.user.getCurrentUser();
  if (!user?.email) {
    redirect("/");
  }
  const { t } = await translate("settings", { lng });

  return (
    <Action action={resendVerificationEmail} initialData="">
      <PageHeader>{t("email.title")}</PageHeader>
      <Stack>
        {user.email.verifiedAt ? (
          <VerifiedAlert lng={lng} />
        ) : (
          <NotVerifiedAlert lng={lng} />
        )}
        <EmailForm email={user.email} />
      </Stack>
    </Action>
  );
}
