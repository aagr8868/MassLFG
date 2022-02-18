import React from "react";
import styles from "./footer_styles.module.scss";
import { Container, Image } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <>
            <div className={styles.footerBuffer} />
            <div className={styles.footer}>
                <Container>
                    <p className={styles.footerText}>
                        © Copyright 2021, All Rights Reserved
                    </p>
                </Container>
            </div>
        </>
    );
};

export default Footer;
