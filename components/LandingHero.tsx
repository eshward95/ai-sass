"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Typewriter } from "nextjs-simple-typewriter";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-5">
        <h1>Best AI tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <Typewriter
            words={[
              "Chatbots.",
              "Photo Generation.",
              "Video Generation.",
              "Music Generation.",
              "Code Generation.",
            ]}
            loop={0}
            // cursor
            // cursorStyle="_"
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="upgrade"
            className="rounded-full font-semibold md:text-lg p-4 md:p-6"
          >
            Get Started for free
          </Button>
        </Link>
      </div>
      <div className="text-xs md:text-sm font-medium text-zinc-400">
        No credit card required.
      </div>
    </div>
  );
};

export default LandingHero;
