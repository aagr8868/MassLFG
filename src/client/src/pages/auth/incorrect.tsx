import React, { useState } from "react";
import styles from "./auth_styles.module.scss";

const Auth: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const [pwdActive, setPwdActive] = useState<boolean>(false);

    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const enoughChars = pwd.length >= 8;


    return (
        <div className={styles.authBubbleContainer}>
            <h3 className={styles.titleContainer}>MassLFG Login</h3>
            <div className={styles.formContainer}>
                <form action = "http://localhost:4000/register" method = "get">
                    <input
                        className={styles.usernameInput}
                        placeholder="Username..."
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id = "username"
                        name = "name"
                    />
                    <br/>
                    <input
                        className={styles.authInput}
                        placeholder="Password..."
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdActive(true)}
                        onBlur={() => setPwdActive(false)}
                        id = "password"
                        name = "psw"
                    />
                    <br/>
                    <br/>
                    <div className={styles.incorrect}>
                        Incorrect UserName / Password
                    </div>
                    
                    {pwdActive && (
                        <div className={styles.reqsContainer}>
                            <div
                                className={
                                    hasLowercase
                                        ? styles.validReq
                                        : styles.invalidReq
                                }
                            >
                                Password has lowercase character
                            </div>
                            <div
                                className={
                                    hasUppercase
                                        ? styles.validReq
                                        : styles.invalidReq
                                }
                            >
                                Password has uppercase character
                            </div>
                            <div
                                className={
                                    hasNumber ? styles.validReq : styles.invalidReq
                                }
                            >
                                Password has a number
                            </div>
                            <div
                                className={
                                    enoughChars
                                        ? styles.validReq
                                        : styles.invalidReq
                                }
                            >
                                Password has eight characters
                            </div>
                        </div>
                    )}
                    <div className={styles.authFooterContainer}>
                        <button className={styles.signUpButton}> Sign Up / Sign In </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
