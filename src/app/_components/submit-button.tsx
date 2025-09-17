"use client";

import { Button, type ButtonProps } from "flowbite-react/components/Button";
import { useTranslation } from "react-i18next";
import { useActionContext } from "react-form-action/client";

import type { RenderProp } from "@/types";

type SubmitButtonProps = Omit<ButtonProps, "children"> &
  Partial<RenderProp<{ isPending: boolean }>>;

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { isPending } = useActionContext();
  const { t } = useTranslation("global");

  const render =
    children ??
    (({ isPending }) => (isPending ? t("submitting") : t("submit")));

  return (
    <Button
      {...props}
      type="submit"
      isProcessing={isPending}
      disabled={isPending}
    >
      {render({ isPending })}
    </Button>
  );
}
