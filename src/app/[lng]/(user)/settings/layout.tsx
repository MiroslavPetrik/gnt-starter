"use server";

import { type LayoutParams } from "@/types";
import { SettingsSidebar } from "./_components/sidebar";

export default async function Profile({
  children,
  params,
}: LayoutParams<"/settings">) {
  const { lng } = await params;

  return (
    <div className="flex flex-1">
      <div className="w-auto flex-none">
        <SettingsSidebar lng={lng} />
      </div>
      <div className="flex-1 p-16">{children}</div>
    </div>
  );
}
