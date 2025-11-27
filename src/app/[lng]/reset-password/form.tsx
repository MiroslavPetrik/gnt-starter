"use client";

import { HelperText, Label, TextInput } from "flowbite-react";
import {
  Form,
  useActionContext,
  createComponents,
} from "react-form-action/client";
import { Alert } from "flowbite-react";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { SubmitButton } from "@/components/submit-button";
import { resetTokenFieldName } from "@/gel/shared";
import { Stack, FormItem, FormLabel } from "@/components";
import { resetPassword } from "./action";

const { FieldError } = createComponents(resetPassword);

const GEL_ERR_MESSAGES = {
  invalidResetToken: "Invalid 'reset_token'",
  // https://github.com/geldata/gel-js/blob/aa7624883800f1263092fe6ee57fd27de4339622/packages/auth-nextjs/src/app/index.ts#L109
  noPkceVerifier: "no pkce verifier cookie found",
};

type Props = { [resetTokenFieldName]: string };

export function ResetPasswordForm({ reset_token }: Props) {
  const { t } = useTranslation("auth", { keyPrefix: "resetPassword" });

  const { isPending, isFailure, isSuccess, isInvalid, error } =
    useActionContext(resetPassword);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  if (isSuccess) {
    return (
      <Stack>
        <div>
          <Alert color="success">
            <Trans i18nKey="success" t={t}>
              <strong>Your password has been reset.</strong> You can now
              continue to the application.
            </Trans>
          </Alert>
        </div>
        <Button href="/dashboard">{t("continueToApplication")}</Button>
      </Stack>
    );
  }

  return (
    <Form>
      <Stack>
        {isFailure && (
          <div>
            <Alert color="failure">
              {error.message === GEL_ERR_MESSAGES.invalidResetToken ? (
                <Trans i18nKey="error.invalidResetToken" t={t}>
                  <strong>The link has expired.</strong> Please request a new
                  one.
                </Trans>
              ) : error.message === GEL_ERR_MESSAGES.noPkceVerifier ? (
                <Trans i18nKey="error.noPkceVerifier" t={t}>
                  <strong>Unable to continue.</strong> Please make sure to use
                  the link in the browser from which you have requested the
                  password reset email.
                </Trans>
              ) : (
                error.message
              )}
            </Alert>
          </div>
        )}
        <FieldError name="password">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("newPassword")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                disabled={isPending}
                color={getColor(error)}
              />
              <HelperText>{error}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <input name={resetTokenFieldName} defaultValue={reset_token} hidden />
        <SubmitButton />
        <Label>
          <Trans i18nKey="linkToReset" t={t}>
            Link expired?&nbsp;
            <Link
              href="/reset-password/email"
              className="text-primary-600 hover:underline"
            >
              Get another.
            </Link>
          </Trans>
        </Label>
      </Stack>
    </Form>
  );
}
