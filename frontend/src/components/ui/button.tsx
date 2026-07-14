import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib';

const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  rounded-xl
  text-sm
  font-medium
  transition-all
  duration-200
  outline-none
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  focus-visible:ring-2
  focus-visible:ring-primary/20
  active:scale-[0.98]
  [&_svg]:size-4
  [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        default: `
          bg-primary
          text-primary-foreground
          shadow-sm
          hover:-translate-y-0.5
          hover:shadow-md
          hover:opacity-95
        `,

        outline: `
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm
          hover:bg-slate-50
          hover:border-slate-300
        `,

        secondary: `
          bg-slate-100
          text-slate-700
          hover:bg-slate-200
        `,

        ghost: `
          text-slate-600
          hover:bg-slate-100
          hover:text-slate-900
        `,

        destructive: `
          bg-red-600
          text-white
          shadow-sm
          hover:bg-red-700
          hover:-translate-y-0.5
          hover:shadow-md
        `,

        link: `
          text-primary
          underline-offset-4
          hover:underline
        `,
      },

      size: {
        xs: 'h-8 px-3 text-xs',

        sm: 'h-9 px-4',

        default: 'h-10 px-5',

        lg: 'h-11 px-6 text-base',

        icon: 'size-10',

        'icon-xs': 'size-8',

        'icon-sm': 'size-9',

        'icon-lg': 'size-11',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };