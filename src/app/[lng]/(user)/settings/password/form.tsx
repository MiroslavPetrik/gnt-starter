"use client";

import { Alert } from "flowbite-react/components/Alert";
import { useTranslation } from "react-i18next";
import { Form, useActionContext } from "react-form-action/client";
import { SubmitButton } from "@/components/submit-button";
import { Stack } from "@/components";

export function PasswordResetEmailForm() {
  const { t } = useTranslation("settings", { keyPrefix: "password" });

  // TODO: the hook (and also createComponents) does not yet accept action with arguments.
  const { isSuccess, isFailure, error } = useActionContext();

  return (
    <Form>
      <Stack>
        <div>
          <SubmitButton>
            {({ isPending }) =>
              isPending ? t("sendEmail.pending") : t("sendEmail.submit")
            }
          </SubmitButton>
        </div>
        {isSuccess && (
          <Alert color="success" rounded>
            {t("sendEmail.success")}
          </Alert>
        )}
        {isFailure && (
          <Alert color="failure" rounded>
            {(error as Error).message}
          </Alert>
        )}
      </Stack>
    </Form>
  );
}
