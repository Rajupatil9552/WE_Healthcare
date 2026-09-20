import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Standard content-width wrapper. Use for every section instead of
 * hand-rolled max-w/mx-auto combinations, so the page-wide content
 * measure stays consistent (see --container-max token).
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-container",
        className,
      )}
      {...props}
    />
  );
}
