import { type FC } from "react";
// import { Icon } from "../../Icon";
// import cn from "classnames";
import { buttonStyles } from "./Button.styles";

type Props = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: 'primary' | "secondary";
    isLink?: boolean;
    linkto?: string;
    disabled?: boolean;
    actionHandler?: () => void;
    className?: string;
}

const Button: FC<Props> = ({
    children,
    type = "button",
    variant = "primary",
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
                    className={buttonStyles(variant, className)}
                >
                    {children}
                </button>
            ) : (
                <a
                    href={linkto}
                    className={buttonStyles(variant, className)}>
                    {children}
                </a>
            )}
        </>
    );
};

export default Button;
