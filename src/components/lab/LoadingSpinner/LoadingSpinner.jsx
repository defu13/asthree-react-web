import DotAnimation from "../DotAnimation/DotAnimation";
import styles from "./LoadingSpinner.module.css";
function LoadingSpinner() {
    return (
        <div className={styles.spinner}>
            <div className="flex gap-2">
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
            <p
            style={{
                fontFamily: "monospace",
            }}
            className="text-sm">Un momento<DotAnimation/></p>
        </div>
    );
}

export default LoadingSpinner;
