import { cn } from "../../../lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      // 1. Max width for desktop (keeping your 1440px)
      "max-w-[1440px] mx-auto w-full",

      // 2. Fluid Padding:
      // px-4 (16px) on mobile - standard for touch devices
      // md:px-10 (40px) on tablets
      // lg:px-20 (80px) on large screens
      "px-4 md:px-10 lg:px-20",

      // 3. Safety: ensure container doesn't exceed screen width
      "relative box-border overflow-hidden md:overflow-visible",

      className,
    )}
  >
    {children}
  </div>
);
