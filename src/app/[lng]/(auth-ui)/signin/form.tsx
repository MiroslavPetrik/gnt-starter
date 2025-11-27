"use client";

import Link from "next/link";
import { Label, TextInput } from "flowbite-react";
import {
  Form,
  createComponents,
  useActionContext,
} from "react-form-action/client";
import { Alert } from "flowbite-react";
import { HelperText } from "flowbite-react/components/HelperText";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { SubmitButton } from "@/components/submit-button";
import { FormLabel, FormItem, Stack } from "@/components";
import { signIn } from "./action";

const { FieldError } = createComponents(signIn);

export function SignInForm() {
  const { t } = useTranslation("auth", { keyPrefix: "signIn" });

  const { isPending, isFailure, isSuccess, isInvalid, error } =
    useActionContext(signIn);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form>
      <Stack>
        {isFailure && (
          <div>
            <Alert color="failure">{error.message}</Alert>
          </div>
        )}
        <FieldError name="email">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("email")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                disabled={isPending}
                color={getColor(error)}
                type="text"
                placeholder={t("yourEmail")}
              />
              <HelperText>{error}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <FieldError name="password">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label
                  htmlFor={name}
                  color={getColor(error)}
                  className="flex justify-between"
                >
                  <span>{t("password")}</span>
                  <Link
                    tabIndex={-1}
                    href="/reset-password/email"
                    className="text-primary-600 hover:underline"
                  >
                    {t("forgotPassword")}
                  </Link>
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                disabled={isPending}
                color={getColor(error)}
                type="password"
                placeholder={t("yourPassword")}
              />
              <HelperText>
                <FieldError name="password" />
              </HelperText>
            </FormItem>
          )}
        </FieldError>
        <SubmitButton />
        <Label>
          <Trans i18nKey="linkToSignUp" t={t}>
            Don&apos;t have an account?&nbsp;
            <Link href="/signup" className="text-primary-600 hover:underline">
              Sign up
            </Link>
          </Trans>
        </Label>
      </Stack>
    </Form>
  );
}
