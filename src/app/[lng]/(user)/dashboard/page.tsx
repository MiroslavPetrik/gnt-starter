import { redirect } from "next/navigation";
import { translate } from "@/i18n";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  const user = await api.user.getCurrentUser();

  if (!user) {
    redirect("/onboarding");
  }
  const { t } = await translate("dashboard");

  return (
    <div className="pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {t("welcome", { name: user.name })}
      </h1>
    </div>
  );
}
