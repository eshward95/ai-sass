"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface SubscriberBtnProps {
  isPro: boolean;
}
export const SubscriptionBtn = ({ isPro = false }: SubscriberBtnProps) => {
  const [loading, setloading] = useState(false);
  const onClick = async () => {
    try {
      setloading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error, "[BILLING_ERROR]");
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "upgrade" : "default"}
      onClick={onClick}
    >
      {isPro ? "Manage subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
