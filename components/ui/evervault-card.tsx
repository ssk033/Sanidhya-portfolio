"use client";

import { useMotionValue } from "motion/react";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  text,
  className,
  roundedFull,
}: {
  text?: string;
  className?: string;
  roundedFull?: boolean;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    setRandomString(generateRandomString(1500));
  }

  const roundClass = roundedFull ? "rounded-full" : "rounded-3xl";

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className={cn(
          "group/card w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full",
          roundClass
        )}
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          roundedFull={roundedFull}
        />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div
            className={cn(
              "relative rounded-full flex items-center justify-center font-bold text-4xl h-full w-full max-h-44 max-w-44 border-2 border-[var(--accent-purple)] bg-gradient-to-br from-[var(--accent-purple)]/40 to-[var(--accent-yellow)]/30 text-[var(--accent-yellow)]"
            )}
          >
            <span className="z-20 relative">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function CardPattern({
  mouseX,
  mouseY,
  randomString,
  roundedFull,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  randomString: string;
  roundedFull?: boolean;
}) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };
  const roundClass = roundedFull ? "rounded-full" : "rounded-2xl";

  return (
    <div className="pointer-events-none">
      <div
        className={cn(
          "absolute inset-0 [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50",
          roundClass
        )}
      />
      <motion.div
        className={cn(
          "absolute inset-0 backdrop-blur-xl transition duration-500 opacity-0 group-hover/card:opacity-100",
          roundClass
        )}
        style={{
          ...style,
          background: "linear-gradient(to right, var(--accent-purple), var(--accent-yellow))",
        }}
      />
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100",
          roundClass
        )}
        style={style}
      >
        <p
          className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap font-mono font-bold transition duration-500"
          style={{ color: "var(--foreground)" }}
        >
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomString(length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function Icon({
  className,
  ...rest
}: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}
