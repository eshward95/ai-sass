import { Heading } from "@/components/heading";
import { SubscriptionBtn } from "@/components/subscription-btn";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="text-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "Pro" : "Free"}
        </div>
        <SubscriptionBtn isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
