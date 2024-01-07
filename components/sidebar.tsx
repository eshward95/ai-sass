"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessagesSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";

import FreeCounter from "@/components/free-counter";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversations",
    href: "/conversation",
    icon: MessagesSquare,
    color: "text-violet-500",
  },
  {
    label: "Image generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-700",
  },
  {
    label: "Video generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-orange-700",
  },
  {
    label: "Music generation",
    href: "/music",
    icon: MusicIcon,
    color: "text-emerald-500",
  },
  {
    label: "Code generation",
    href: "/code",
    icon: Code,
    color: "text-green-500",
  },
  {
    label: "Setting",
    href: "/settings",
    icon: Settings,
    color: "",
  },
];
const Sidebar = ({
  apiLimitCount = 0,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn(montserrat.className, "text-2xl font-bold")}>
            Eddie
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointerhover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn(route.color, "w-5 h-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
