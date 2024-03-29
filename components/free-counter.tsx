import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const FreeCounter = ({
  apiLimitCount = 0,
  isPro,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (isPro) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>Free Generations</p>
            <p className="text-4xl font-bold">
              {apiLimitCount}/{MAX_FREE_COUNTS}
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className="w-full"
            variant="upgrade"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
