import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs sm:text-sm font-semibold tracking-[0.15em] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#121212] text-white hover:bg-[#C5A880] shadow-sm uppercase",
        gold: "gold-gradient text-white hover:shadow-gold uppercase font-bold",
        outline:
          "border border-[#121212] bg-transparent text-[#121212] hover:bg-[#121212] hover:text-white uppercase",
        ghost: "hover:bg-[#FAF8F5] text-[#121212] uppercase",
        link: "text-[#C5A880] underline-offset-4 hover:underline normal-case tracking-normal",
        glass: "glass text-[#121212] hover:bg-white/90 uppercase",
      },
      size: {
        default: "h-12 px-7 py-3",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-14 px-9 text-sm",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
