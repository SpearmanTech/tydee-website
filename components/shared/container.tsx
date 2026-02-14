import { cn } from "../../lib/utils";

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("max-w-[1440px] mx-auto px-6 md:px-12 w-full", className)}>
    {children}
  </div>
);