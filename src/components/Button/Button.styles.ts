import cn from "classnames";

export const buttonStyles = (
  variant: "primary" | "secondary",
  className?: string
) =>
  cn(
    "cursor-pointer font-sf-pro-text font-medium flex justify-center items-center w-full hover:opacity-85 transition-all duration-200 active:opacity-60 disabled:text-gray-500 disabled:bg-gray-400 disabled:pointer-events-none",
    {
      "h-[46px] bg-red-100 text-white-100 rounded-lg text-[17px]":
        variant === "primary",
      "h-10 bg-white-100 text-text-primary rounded-[8px] text-[15px]":
        variant === "secondary"
    },
    className
  );
