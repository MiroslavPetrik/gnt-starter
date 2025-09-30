import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { authorizedSession } from "@/gel";

export default async function AuthLayout({ children }: PropsWithChildren) {
  if (await authorizedSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 justify-center bg-gray-200">
      <main className="my-auto h-min w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        {children}
      </main>
    </div>
  );
}
