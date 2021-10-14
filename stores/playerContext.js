import { createContext, useState, useRef } from "react";
import Song from "../objects/Song";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const globalPlayerReference = useRef(null);

    const togglePlaying = () => {
        setPlaying(current => !current)
    }

    return (
        <PlayerContext.Provider value={{
            playing,
            setPlaying, togglePlaying,
            currentSong, setCurrentSong,
            played, setPlayed,
            seeking, setSeeking,
            globalPlayerReference
        }}>{children}</PlayerContext.Provider>
    );
}

export { PlayerContext, PlayerContextProvider };