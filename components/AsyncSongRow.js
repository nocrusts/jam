import SongRow from "./SongRow";
import { useState } from "react";
import Song from "../objects/Song";

const AsyncSongRow = (props) => {
    const [song, setSong] = useState({});

    props.promise.then(song => {
        setSong(song);
    });

    return (
        <SongRow song={song} index={props.index} />
    )
}

export default AsyncSongRow;