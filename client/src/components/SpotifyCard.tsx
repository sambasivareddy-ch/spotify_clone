import React from "react";
import { useNavigate } from "react-router-dom";

import styles from '../styles/spotifycard.module.css';

const SpotifyCard: React.FC<{
    id: string;
    name: string;
    href: string;
    icon: string;
}> = (props) => {
    const navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/categories/${props.id}`)
    }

    return (
        <div className={styles['spotify-card_wrapper']} onClick={cardClickHandler}>
            <div className={styles['spotify-card_icon']}>
                <img src={props.icon} alt={props.name}/>
            </div>
            <div className={styles['spotify-card_name']}>
                <h3>{ props.name }</h3>
            </div>
        </div>
    )
}

export default SpotifyCard;