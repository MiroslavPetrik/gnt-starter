"use server";

import { authAction } from "@/gel";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.email(),
});

export const resendVerificationEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { actions } }) =>
    actions.emailPasswordResendVerificationEmail(input),
  );
