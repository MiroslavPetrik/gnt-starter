import { type LayoutParams } from "@/types";
import { SettingsSidebar } from "./_components/sidebar";

export default async function SettingsLayout({
  children,
}: LayoutParams<"/settings">) {
  return (
    <div className="flex flex-1">
      <div className="w-auto flex-none">
        <SettingsSidebar />
      </div>
      <div className="flex-1 p-16">{children}</div>
    </div>
  );
}
