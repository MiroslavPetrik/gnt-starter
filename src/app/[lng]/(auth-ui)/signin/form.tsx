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
import { SubmitButton } from "@/app/_components/submit-button";
import { FormLabel, FormItem, Stack } from "@/app/_components";
import { signIn } from "./action";

const { FieldError } = createComponents(signIn);

export function SignInForm() {
  const { t } = useTranslation("auth");

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
                  {t("signIn.email")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                disabled={isPending}
                color={getColor(error)}
                type="text"
                placeholder="hello@gnt.app"
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
                  <span>{t("signIn.password")}</span>
                  <Link
                    tabIndex={-1}
                    href="/reset-password/email"
                    className="text-primary-600 hover:underline"
                  >
                    {t("signIn.forgotPassword")}
                  </Link>
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                disabled={isPending}
                color={getColor(error)}
                type="password"
                placeholder="Your password"
              />
              <HelperText>
                <FieldError name="password" />
              </HelperText>
            </FormItem>
          )}
        </FieldError>
        <SubmitButton />
        <Label>
          <Trans i18nKey="signIn.linkToSignUp" t={t}>
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
