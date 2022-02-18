import React, { useEffect, useState } from "react";
import styles from "./group_styles.module.scss";
import { IoSend } from "react-icons/io5";
import { palette } from "../../global_styles/palette";
import { io, Socket } from "socket.io-client";

const GroupChat: React.FC = () => {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);

    const [currMsg, setCurrMsg] = useState<string>("");

    useEffect(() => {
        const newSocket = io("http://localhost:4000", {
            withCredentials: true,
            transports: ["websocket"],
        });

        newSocket.on("connect", () => {
            console.log("Connected to server!");
        });

        newSocket.on("msg", (msg) => {
            setMessages((msgs) => {
                const new_messages = [...msgs];
                new_messages.push(msg);

                return new_messages;
            });
        });

        setSocket(newSocket);
    }, []);

    const sendMsg = () => {
        if (!!currMsg) {
            setMessages((msgs) => {
                const new_messages = [...msgs];
                new_messages.push(currMsg);

                return new_messages;
            });

            !!socket && socket.emit("msg", currMsg);

            setCurrMsg("");
        }
    };

    return (
        <div className={styles.groupContainer}>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div className={styles.message} key={index}>
                        {msg}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <form
                    className={styles.messageForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMsg();
                    }}
                >
                    <input
                        className={styles.messageInput}
                        value={currMsg}
                        onChange={(e) => setCurrMsg(e.target.value)}
                    />
                </form>
                <div className={styles.messageSendButton} onClick={sendMsg}>
                    <IoSend color={palette.deepBlue} />
                </div>
            </div>
        </div>
    );
};

export default GroupChat;
