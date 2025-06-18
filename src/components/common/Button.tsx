import type { FC } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
      className={cn(
        "text-white p-2 rounded-md hover:bg-blue-400 cursor-pointer",
        variant === "primary" && "bg-blue-500 hover:bg-blue-400",
        variant === "danger" && "bg-red-400 hover:bg-red-500",
        variant === "outline" &&
          "border border-gray-300 text-black hover:bg-gray-100",
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
