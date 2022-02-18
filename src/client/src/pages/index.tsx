import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const HomePage: React.FC = () => {
    return (
        <div className={styles.outerContainer}>
            <div className={`${styles.headerContainer} p-4`}>
                <h1 className={`${styles.headerTitleContainer} display-1`}>
                    MassLFG
                </h1>
                <div className={styles.sloganContainer}>
                    <h4 className={styles.sloganText}>
                        The Internet's most Dynamic Gaming Hub
                    </h4>
                </div>
                <div className={styles.useCaseContainer}>
                    <h2 className={styles.useCaseText}>
                        <span className={styles.useCasePart}>Find Groups</span>
                        <span className={styles.useCasePart}>
                            Chat with New Friends
                        </span>
                        <span className={styles.useCasePart}>Explore</span>
                    </h2>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href="/auth">
                        <a className="button">Sign in</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
