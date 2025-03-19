import React from "react";
import { useParams } from "react-router-dom";

const Playlists: React.FC = () => {
    const {id} = useParams();
    return <div>{ id }</div>
}

export default Playlists;