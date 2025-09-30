import createAuth from "@gel/auth-nextjs/app";
import { formAction } from "react-form-action";

import { getBaseUrl } from "@/server/baseUrl";
import { translate } from "@/i18n";
import { client } from "./client";

export const auth = createAuth(client, {
  baseUrl: getBaseUrl(),
  passwordResetPath: "/reset-password",
});

/**
 * A helper function to get the current session if the user is signed in.
 * @returns The current session if the user is signed in, otherwise null.
 */
export async function authorizedSession() {
  const session = await auth.getSession();

  if (await session.isSignedIn()) {
    return session;
  }

  return null;
}

const actions = auth.createServerActions();

/**
 * An action with authorized edgedb session in the context.
 * Use it to make queries with the current user: e.select(e.global.current_user).run(session.client)
 */
export const authorizedAction = formAction.use(async () => {
  const session = await authorizedSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return { session };
});

/**
 * A wrapper around the edgedb auth actions that provides error handling and translation.
 */
export const authAction = formAction
  .use(async () => ({ actions }))
  .use(async () => {
    const { t } = await translate("auth");
    return { t };
  })
  .error(async ({ error, ctx: { t } }) => {
    if (error instanceof Error) {
      const gelError = translateGelError(error, t);

      return {
        message: gelError?.message ?? getErrorMessage(error, t),
      };
    } else {
      return {
        message: t("auth:unexpectedError"),
      };
    }
  });

const getErrorMessage = (error: Error, t: (key: string) => string) => {
  if (typeof error.cause === "string") {
    return error.cause;
  }

  return error.message ?? t("auth:unexpectedError");
};

const translateGelError = (error: Error, t: (key: string) => string) => {
  // https://github.com/geldata/gel/blob/6b29802935d71545e242e07db7a4a2074753287c/edb/server/protocol/auth_ext/errors.py#L183
  if (error.message === "Email verification is required") {
    return { message: t("auth:gel.emailVerificationRequired") };
  }

  // https://github.com/geldata/gel/blob/e675e03b22dc040812ef506fd30845e2d0a7f386/edb/server/protocol/auth_ext/errors.py#L102
  if (
    error.message ===
    "Could not find an Identity matching the provided credentials"
  ) {
    return { message: t("auth:gel.noIdentityFound") };
  }

  // https://github.com/geldata/gel/blob/e675e03b22dc040812ef506fd30845e2d0a7f386/edb/server/protocol/auth_ext/errors.py#L123
  if (error.message === "This user has already been registered") {
    return { message: t("auth:gel.userAlreadyRegistered") };
  }
};
