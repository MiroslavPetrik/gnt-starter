import { redirect } from "next/navigation";
import { auth } from "@/gel";
import { cookies } from "next/headers";

const { GET, POST } = auth.createAuthRouteHandlers({
  onEmailVerify({ error }) {
    if (error) {
      // TODO: handle error
      redirect("/");
    } else {
      redirect("/settings/email");
    }
  },
  async onSignout() {
    // FIXME: the 'set-cookie' response headers are set only when the cookie store is awaited:
    await cookies();

    redirect("/");
  },
});

export { GET, POST };
