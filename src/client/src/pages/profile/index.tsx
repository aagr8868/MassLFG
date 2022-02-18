import React, { useEffect, useState } from "react";
import styles from "./profile_styles.module.scss";
import Link from "next/link";
import { SteamGame } from "./profile_types/games";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const Profile: React.FC = () => {
    const [editActive, setEditActive] = useState<boolean>(false);
    // const [bio, setBio] = useState<string>(
    //     "This is my bio. I love strategy games, base-builder games, and FPS games."
    // );
    const [games, setGames] = useState<SteamGame[]>([]);
    const [username, setUserName] = useState<any[]>([]);
    const [bio, getBio] = useState<string>();

    useEffect(() => {
        (async () => {
            console.log("Ok, we're starting...");
            try {
                const data = await axios.get("http://localhost:4000/games");
                console.log("Got games:", data.data);

                setGames(data.data as SteamGame[]);
            } catch (e) {
                console.error("Game fetch error: ", e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            console.log("Ok, we're getting Bio...");
            try {
                const data = await axios.get("http://localhost:4000/getBio");
                console.log("Got Bio:", data.data);

                getBio(data.data as string);
            } catch (e) {
                console.error("Bio fetch error: ", e);
            }
        })();
    }, []);

    const importSteam = async () => {
        window.location.replace("http://localhost:4000/api/auth/steam");
    };

    useEffect(() => {
        (async () => {
            console.log("Ok, we're getting the username...");
            try {
                const data = await axios.get("http://localhost:4000/getUserName");
                console.log("Got games:", data.data);

                setUserName(data.data as any[]);
            } catch (e) {
                console.error("Username fetch error: ", e);
            }
        })();
    }, []);

    return (
        <div className={styles.outerContainer}>
            <div className={styles.headerContainer}>
                <h1 className={`${styles.usernameContainer} display-4`}>
                    {username}
                </h1>
                <div className={styles.bioContainer}>
                    <form action = "http://localhost:4000/setBio" method = "get">
                        <input
                            className={styles.bioInput}
                            placeholder = {bio}
                            type = "text"
                            name = "bio"
                        />
                        <div className={styles.authFooterContainer}>
                        <button className={styles.saveButton}> Save </button>
                        </div>
                    </form>
                    {/* <div className={styles.bioTitleContainer}>
                        <span className={styles.bioTitle}>Bio</span>
                        <span
                            className={styles.bioEdit}
                            onClick={() => setEditActive(!editActive)}
                        >
                            {editActive ? "Save" : "Edit"}
                        </span>
                    </div>
                    {editActive ? (
                        <input
                            className={styles.bioInput}
                            autoFocus
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <p className={styles.bioText}>{bio}</p>
                    )} */}
                </div>
            </div>
            <div className={styles.findGroupContainer}>
                <Link href="/group">
                    <a className="button">Find Group</a>
                </Link>
            </div>
            <div className={styles.yourGamesContainer}>
                <div className={styles.gamesHeader}>
                    <div className={styles.gamesHeaderLeft}>
                        <h4 className={styles.yourGamesTitle}>Your Games</h4>
                    </div>
                    <div className={styles.gamesHeaderRight}>
                        <div
                            className={styles.importSteamButton}
                            onClick={importSteam}
                        >
                            Import Steam Library
                        </div>
                    </div>
                </div>
                {games.length > 0 ? (
                    <Row className={styles.gamesRowContainer}>
                        {games.map((game) => (
                            <Col className={styles.gameContainer}>
                                <div className = {styles.gamepic}>
                                    <img src = {`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}></img>
                                </div>
        
                                <div className={styles.gameBody}>
                                    <a
                                        href={`https://steamdb.info/app/${game.appid}`}
                                        target="_blank"
                                        className={styles.visitGameButton}
                                    >
                                    {game.name}

                                    </a>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className={styles.gamesContainer}>
                        You haven't added any games yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
