import { type FC } from "react";
// import { Icon } from "../../Icon";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    isLink?: boolean;
    linkto?: string;
    disabled?: boolean;
    actionHandler?: () => void;
    className?: string;
}

const PrimaryButton: FC<Props> = ({
    children,
    type = "button",
    isLink = false,
    linkto = "/",
    disabled = false,
    actionHandler,
    className,
}) => {

    return (
        <>
            {!isLink ? (
                <button
                    type={type}
                    onClick={actionHandler}
                    disabled={disabled}
                    className={cn("cursor-pointer font-sf-pro-text font-medium text-[17px] flex justify-center items-center w-full h-[46px] rounded-lg hover:opacity-85 transition-all duration-200 bg-red-100 active:opacity-60 text-white-100", className)}
                >
                    {children}
                </button>
            ) : (
                <a href={linkto} className={cn("cursor-pointer font-sf-pro-text font-medium text-[17px] flex justify-center items-center w-full h-[46px] rounded-lg hover:opacity-85 transition-all duration-200 bg-red-100 active:opacity-60 text-white-100", className)}>
                    {children}
                </a>
            )}
        </>
    );
};

export default PrimaryButton;
