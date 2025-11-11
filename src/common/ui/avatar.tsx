"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "./utils";

interface AvatarImageProps extends Omit<React.ComponentProps<typeof Image>, 'onLoad' | 'onError'> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  onLoadingStatusChange,
  alt = "",
  width = 40,
  height = 40,
  ...props
}: AvatarImageProps) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading");

  React.useEffect(() => {
    onLoadingStatusChange?.(status);
  }, [status, onLoadingStatusChange]);

  return (
    <Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      alt={alt}
      width={typeof width === 'number' ? width : 40}
      height={typeof height === 'number' ? height : 40}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
