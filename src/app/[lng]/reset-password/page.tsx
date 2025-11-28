import { Action } from "react-form-action/client";
import { PageHeader } from "@/components/page-header";
import { type SearchParams, type Params, getSearchParam } from "@/types";
import { translate } from "@/i18n";
import { resetTokenFieldName } from "@/gel/shared";

import { resetPassword } from "./action";
import { ResetPasswordForm } from "./form";

type ResetPasswordSearchParams = SearchParams<typeof resetTokenFieldName>;

export default async function ResetPassword({
  searchParams,
}: Params & ResetPasswordSearchParams) {
  const { reset_token = "" } = getSearchParam(
    await searchParams,
    resetTokenFieldName,
  );
  const { t } = await translate("reset-password");

  return (
    <Action action={resetPassword} initialData={undefined}>
      <PageHeader>{t("title")}</PageHeader>
      <ResetPasswordForm reset_token={reset_token} />
    </Action>
  );
}
