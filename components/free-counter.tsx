import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const FreeCounter = ({ apiLimitCount = 0 }: { apiLimitCount: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

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
          <Button className="w-full" variant="upgrade">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
