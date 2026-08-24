import React from "react";
import styles from "./DotAnimation.module.css";

const DotAnimation = () => {

    const dots = Array.from({ length: 3 });

    return (
        <>
            {dots.map((_, index) => (
                <span key={index} className={styles.animate_dot}>{"."}</span>
            ))}
        </>
    );
};

export default DotAnimation;
