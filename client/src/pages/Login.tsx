import React from "react";

import ArtistImageBubble from "../components/ArtistImageBubble";
import Button from "../components/Button";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
    const loginClickHandler = async () => {
        window.location.href = "http://localhost:3000/login";
    };

    return (
        <div className={styles["login-page_wrapper"]}>
            <div className={styles["login-container"]}>
                <div className={styles["artists-bubbles"]}>
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                    <ArtistImageBubble />
                </div>
                <div className={styles["login-button"]}>
                    <Button
                        button_text="Continue with Spotify"
                        clickHandler={loginClickHandler}
                        className={styles["spotify-btn"]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
