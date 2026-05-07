"use client";

import * as React from "react";
import MyImage, { WondrrImageProps } from "./Image";


import { cn } from "./utils";

interface AvatarImageProps extends Omit<WondrrImageProps, 'onLoad' | 'onError'> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [imageStatus, setImageStatus] = React.useState<"loading" | "loaded" | "error">("loading");

  const avatarImage = React.useMemo(() => React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarImage
  ) as React.ReactElement<AvatarImageProps> | undefined, [children]);

  const avatarFallback = React.useMemo(() => React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === AvatarFallback
  ), [children]);

  React.useEffect(() => {
    if (!avatarImage || !avatarImage.props.src) {
      setImageStatus("error");
    } else {
      setImageStatus("loading");
    }
  }, [avatarImage?.props.src]);

  const showFallback = imageStatus === "error";

  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {avatarImage && avatarImage.props.src &&
        React.cloneElement(avatarImage, {
          onLoadingStatusChange: setImageStatus,
        })}
      {showFallback && avatarFallback}
    </div>
  );
}

function AvatarImage({
  className,
  onLoadingStatusChange,
  alt = "",
  fill = true,
  ...props
}: AvatarImageProps) {
  return (
    <MyImage
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      alt={alt}
      fill={fill}
      onLoad={() => onLoadingStatusChange?.("loaded")}
      onError={() => onLoadingStatusChange?.("error")}
      {...props}
      quality={90}
    />
  );
}

function AvatarFallback({ className, name, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { name?: string }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "bg-gradient-to-br from-blue-500 to-blue-700 text-white flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children || initials}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
