import React from "react";
import styles from "./top_nav_styles.module.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

interface Props {
    displayClassName: string;
}

const TopNapBar: React.FC<Props> = (props) => {
    return (
        <Navbar
            collapseOnSelect
            className={`shadow-sm bg-white ${props.displayClassName} ${styles.navContainer}`}
            expand="md"
        >
            <Navbar.Brand>
                <Link href="/">
                    <a className={styles.logoContainer}>MassLFG</a>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="nav-options" />
            <Navbar.Collapse id="nav-options">
                <Nav className={styles.navLeft}>
                    <Nav.Link href="/profile">
                        <div className={styles.linkText}>Profile</div>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/auth">
                        <div className={styles.linkText}>Sign in</div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const TopNav: React.FC = () => {
    return (
        <>
            <TopNapBar displayClassName="d-flex d-sm-none" />
            <TopNapBar displayClassName="d-none d-sm-flex sticky-top" />
        </>
    );
};

export default TopNav;
