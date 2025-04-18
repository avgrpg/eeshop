"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface ImageWithLoaderProps
  extends React.ComponentProps<typeof Image> {
    wrapperClassName?: string;
    loaderClassName?: string;
  }

export function ImageWithLoader({
  wrapperClassName,
  loaderClassName,
  ...props
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cn("relative grid min-h-max min-w-max h-full w-full", wrapperClassName)}>
      {/* {!isLoaded && <Skeleton className="h-full w-full" />} */}
      <Image onLoad={() => setIsLoaded(true)} {...props} alt={props.alt} />
      {!isLoaded 
        // || true
      && (
        <div className={cn("absolute left-0 top-0 flex h-full w-full items-center justify-center bg-muted", loaderClassName)}>
          <div className="">
            <svg
              className={`h-12 w-12 animate-spin text-foreground`}
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
