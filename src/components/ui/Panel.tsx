import { clsx } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Panel({
  children,
  className = "",
  glow = false,
  hover = false,
  brackened = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  brackened?: boolean;
}) {
  return (
    <div
      className={clsx(
        "panel",
        hover && "panel-hover",
        brackened && "corner-brackets",
        glow && "glow-box",
        className
      )}
    >
      {children}
    </div>
  );
}