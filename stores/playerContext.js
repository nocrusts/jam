import { createContext, useState, useRef, useEffect } from "react";
import Song from "../objects/Song";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(Song.create());
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);

    // Queue related states
    const [queue, setQueue] = useState([]);
    const [queueIndex, setQueueIndex] = useState(0);

    const globalPlayerReference = useRef(null);

    const nextSong = async () => {
        setQueueIndex(current => Math.min(current + 1, queue.length));
    }

    const previousSong = async () => {
        if (globalPlayerReference.current.getCurrentTime() > 3 && !currentSong.dummy) {
            globalPlayerReference.current.seekTo(0);
        } else {
            setQueueIndex(current => Math.max(-1, current - 1));
        }
    }

    const addToQueue = async (song) => {
        if (queue[queue.length - 1]?.url != song.url) {
            setQueue(current => [...current, song]);
            if (currentSong.dummy) {
                setCurrentSong(song);
                setPlaying(true);
            }
        }
    }

    const togglePlaying = () => {
        setPlaying(current => !current)
    }

    useEffect(() => {
        if (queueIndex >= queue.length || queueIndex < 0) {
            setCurrentSong(Song.create());
        }

        else if (queue.length > 0) {
            setCurrentSong(queue[queueIndex]);
            console.log("set song to", queue[queueIndex])
        }
    }, [queueIndex]);

    return (
        <PlayerContext.Provider value={{
            playing,
            setPlaying, togglePlaying,
            currentSong, setCurrentSong,
            played, setPlayed,
            seeking, setSeeking,
            globalPlayerReference,
            queue, setQueue,
            queueIndex, setQueueIndex,
            nextSong, previousSong,
            addToQueue
        }}>{children}</PlayerContext.Provider>
    );
}

export { PlayerContext, PlayerContextProvider };