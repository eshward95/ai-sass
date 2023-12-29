"use client";

import MobileSidebar from "@/components/mobile-sidebar";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
