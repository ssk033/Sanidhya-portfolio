"use client";

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center font-sans tracking-tight text-[var(--foreground)]">
        What&apos;s cooler than Beams?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div
            className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent py-4 [text-shadow:0_0_rgba(0,0,0,0.1)]"
            style={{
              backgroundImage: `linear-gradient(to right, var(--accent-purple), var(--accent-yellow))`,
            }}
          >
            <span>Exploding beams.</span>
          </div>
          <div
            className="relative bg-clip-text text-transparent bg-no-repeat py-4"
            style={{
              backgroundImage: `linear-gradient(to right, var(--accent-purple), var(--accent-yellow))`,
            }}
          >
            <span>Exploding beams.</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
