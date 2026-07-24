import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-[#EFECE7] bg-[#FAF8F5] px-4 py-3 text-xs sm:text-sm text-[#121212] transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#C5A880] focus:bg-white disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
