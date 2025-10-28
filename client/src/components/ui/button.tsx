import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--visa-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--visa-primary)] text-white hover:bg-[var(--visa-primary-dark)] shadow-md hover:shadow-lg active:scale-95",
        destructive:
          "bg-[var(--destructive)] text-white hover:bg-red-600 shadow-md hover:shadow-lg active:scale-95",
        outline:
          "border-2 border-[var(--visa-border)] bg-[var(--visa-surface)] text-[var(--visa-text-primary)] hover:bg-[var(--visa-surface-alt)] hover:border-[var(--visa-primary)] active:scale-95",
        secondary:
          "bg-[var(--visa-surface)] text-[var(--visa-text-primary)] border border-[var(--visa-border)] hover:bg-[var(--visa-surface-alt)] active:scale-95",
        ghost: "hover:bg-[var(--visa-surface-alt)] text-[var(--visa-text-secondary)] hover:text-[var(--visa-text-primary)] active:scale-95",
        link: "text-[var(--visa-primary)] underline-offset-4 hover:underline font-medium",
        enterprise: "gradient-primary text-white shadow-lg hover:shadow-xl active:scale-95 px-6 py-3",
        success: "bg-[var(--success)] text-white hover:bg-emerald-600 shadow-md hover:shadow-lg active:scale-95",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-11 w-11 rounded-xl",
        xl: "h-16 rounded-xl px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
