import React from "react";

import styles from "../styles/Button.module.css";

const Button: React.FC<{
    button_text: string;
    clickHandler?: () => void;
    disabled?: boolean;
    className?: string;
}> = (props) => {
    const classes: string = `${styles["button"]} ${props.className ? props.className : ""}`;

    const handleClick = () => {
        if (props.clickHandler) {
            props.clickHandler();
        }
    };

    return (
        <button className={classes} onClick={handleClick}>
            {props.button_text}
        </button>
    );
};

export default Button;
