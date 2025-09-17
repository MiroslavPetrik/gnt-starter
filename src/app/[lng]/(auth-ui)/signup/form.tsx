"use client";

import {
  Alert,
  Button,
  Checkbox,
  HelperText,
  Label,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import {
  Form,
  createComponents,
  useActionContext,
} from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { Stack, FormItem, FormLabel } from "@/app/_components";
import { signUp } from "./action";

const { FieldError } = createComponents(signUp);

export function SignUpForm() {
  const { t } = useTranslation("auth");

  const { isPending, isFailure, isSuccess, isInvalid, error, data } =
    useActionContext(signUp);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form>
      <Stack>
        {isSuccess && (
          <div>
            <Alert color="success">{data}</Alert>
          </div>
        )}
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
                  {t("signUp.email")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="email"
                placeholder="name@gnt.app"
                required
                shadow
                color={getColor(error)}
              />
              <HelperText>{error}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <FieldError name="password">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("signUp.password")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                required
                shadow
                color={getColor(error)}
              />
              <HelperText>{error}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <FieldError name="passwordRepeat">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("signUp.passwordRepeat")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                required
                shadow
                color={getColor(error)}
              />
              <HelperText>{error}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <FieldError name="tos">
          {({ error, name }) => (
            <FormItem className="flex items-center gap-2">
              <Checkbox id={name} name={name} color={getColor(error)} />
              <div className="flex flex-col">
                <Label
                  htmlFor={name}
                  className="flex whitespace-pre-wrap"
                  color={getColor(error)}
                >
                  <Trans i18nKey="signUp.agreeTOC" t={t}>
                    I agree with the&nbsp;
                    <Link
                      href="#"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      terms and conditions
                    </Link>
                  </Trans>
                </Label>
                <HelperText className="mt-0 text-xs" color="failure">
                  {error}
                </HelperText>
              </div>
            </FormItem>
          )}
        </FieldError>
        <Button type="submit" disabled={isPending}>
          {t("signUp.register")}
        </Button>
        <Label>
          <Trans i18nKey="signUp.linkToSignIn" t={t}>
            Already have an account?&nbsp;
            <Link
              href="/signin"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign in
            </Link>
          </Trans>
        </Label>
      </Stack>
    </Form>
  );
}
