"use server";

import { authAction } from "@/gel";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signIn = authAction
  .input(signInSchema)
  .run(async ({ input, ctx: { actions } }) => {
    /**
     * This sets auth cookie, and toggles the session.isSignedIn().
     * So the AuthLayout will redirect the user to dashboard.
     */
    await actions.emailPasswordSignIn(input);
  });
