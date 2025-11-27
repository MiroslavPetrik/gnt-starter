import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarItem,
  SidebarItemProps,
} from "flowbite-react/components/Sidebar";
import { LangRoutes } from "@/types";

type Props = Pick<SidebarItemProps, "icon" | "children"> & { href: LangRoutes };

export function SidebarLink({ href, ...props }: Props) {
  const pathname = usePathname();

  return (
    <SidebarItem
      as={Link}
      href={href}
      active={pathname.startsWith(href)}
      {...props}
    />
  );
}
