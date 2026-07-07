import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-luxury-black text-white hover:bg-luxury-charcoal shadow-luxury hover:shadow-luxury-lg uppercase tracking-[0.12em]",
        gold: "gold-gradient text-white hover:shadow-gold uppercase tracking-[0.12em]",
        outline:
          "border border-luxury-black bg-transparent text-luxury-black hover:bg-luxury-black hover:text-white uppercase tracking-[0.12em]",
        ghost: "hover:bg-luxury-cream text-luxury-black",
        link: "text-luxury-gold underline-offset-4 hover:underline",
        glass: "glass text-luxury-black hover:bg-white/90",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
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
