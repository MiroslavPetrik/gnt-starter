"use client";

import { Form, useActionContext } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";
import { type UserEmail } from "@/types";
import { Label, TextInput, HelperText } from "flowbite-react";
import { FormLabel, FormItem, Stack } from "@/app/_components";
import { resendVerificationEmail } from "./action";

type Props = { email: UserEmail };

export function EmailForm({ email }: Props) {
  const { t } = useTranslation("settings", { keyPrefix: "email" });

  const { isSuccess, isFailure, data, error } = useActionContext(
    resendVerificationEmail,
  );

  return (
    <Form>
      <Stack>
        <FormItem>
          <FormLabel>
            <Label
              htmlFor="email"
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
            >
              {t("yourEmail")}
            </Label>
          </FormLabel>
          <TextInput
            readOnly
            id="email"
            name="email"
            value={email.address}
            color={isFailure ? "failure" : isSuccess ? "success" : undefined}
          />
          <HelperText>
            {isFailure && error.message
              ? error.message
              : isSuccess
                ? data
                : undefined}
          </HelperText>
        </FormItem>
        {!email.verifiedAt && (
          <div>
            <SubmitButton color="yellow">
              {({ isPending }) =>
                isPending
                  ? t("sendingVerificationLink")
                  : t("sendVerificationLink")
              }
            </SubmitButton>
          </div>
        )}
      </Stack>
    </Form>
  );
}
