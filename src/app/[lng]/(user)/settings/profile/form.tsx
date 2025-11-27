"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, HelperText, Label, TextInput } from "flowbite-react";
import {
  createComponents,
  Form,
  useActionContext,
} from "react-form-action/client";
import { type User } from "@/types/user";
import { SubmitButton } from "@/components/submit-button";
import { FormItem, FormLabel, Stack } from "@/components";

import { updateUser } from "./action";
import { updateUserSchema } from "./schema";

const { FieldError, Success } = createComponents(updateUser);

export function UpdateUserForm({ user }: { user: User }) {
  const { t } = useTranslation("settings", { keyPrefix: "editProfile" });
  const [nameError, setNameErr] = useState<string | undefined>(undefined);
  const { isPending, isSuccess, isInvalid } = useActionContext(updateUser);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form className="flex flex-col gap-2">
      <Stack>
        <Success>
          <Alert color="success">{t("success")}</Alert>
        </Success>
        <FieldError name="name">
          {({ name, error }) => (
            <FormItem>
              <FormLabel>
                <Label
                  htmlFor={name}
                  color={nameError ? "failure" : getColor(error)}
                >
                  {t("name")}
                </Label>
              </FormLabel>
              <TextInput
                defaultValue={user.name}
                id={name}
                name={name}
                type="text"
                disabled={isPending}
                color={nameError ? "failure" : getColor(error)}
                placeholder={t("newName")}
                onChange={(e) => {
                  const result = updateUserSchema.shape.name.safeParse(
                    e.target.value,
                  );

                  setNameErr(result.error?.issues[0]?.message);
                }}
              />
              <HelperText>{error ?? nameError}</HelperText>
            </FormItem>
          )}
        </FieldError>
        <SubmitButton />
      </Stack>
    </Form>
  );
}
