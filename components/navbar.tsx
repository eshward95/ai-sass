"use client";

import MobileSidebar from "@/components/mobile-sidebar";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({
  apiLimitCount = 0,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
