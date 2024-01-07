// "use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getUserApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getUserApiLimit();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
