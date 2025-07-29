import type { FC } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getVariantStyles = (
  variant: NonNullable<ButtonProps["variant"]>,
  disabled: boolean = false
) => {
  const baseStyles = "p-2 rounded-md cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-400 text-white",
    outline: "border border-gray-300 text-black",
  } satisfies Record<typeof variant, string>;

  const hoverStyles = {
    primary: "hover:bg-blue-400",
    danger: "hover:bg-red-500",
    outline: "hover:bg-gray-100",
  } satisfies Record<typeof variant, string>;

  return cn(
    baseStyles,
    variantStyles[variant],
    !disabled && hoverStyles[variant],
    disabled && "opacity-50 cursor-not-allowed"
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={cn(getVariantStyles(variant, disabled), className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
