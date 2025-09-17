import type { LayoutParams } from "@/types";

export default async function Layout({
  children,
}: LayoutParams<"/reset-password">) {
  return (
    <div className="flex flex-1 justify-center bg-gray-200">
      <main className="my-auto h-min w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        {children}
      </main>
    </div>
  );
}
