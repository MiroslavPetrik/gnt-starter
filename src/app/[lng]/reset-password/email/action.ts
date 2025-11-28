"use server";

import { authAction } from "@/gel";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.email(),
});

export const resetPasswordEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { actions } }) =>
    actions.emailPasswordSendPasswordResetEmail(input),
  );
