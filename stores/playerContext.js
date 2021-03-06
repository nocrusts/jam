import { createContext, useState, useRef, useEffect } from "react";
import Song from "../objects/Song";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const [playing, setPlaying] = useState(false); // true if song is playing
    const [currentSong, setCurrentSong] = useState({}); // current song
    const [played, setPlayed] = useState(0); // Progress in seconds
    const [seeking, setSeeking] = useState(false); // true if seeking
    const [queue, setQueue] = useState([]); // Queue of songs
    const [queueIndex, setQueueIndex] = useState(0); // Index of current song in queue

    const globalPlayerReference = useRef(null); // Reference to global player


    const nextSong = async () => {
        if (await queueIndex + 1 == queue.length) {
            setCurrentSong(Song.create(undefined, "playerContext"));
            setPlayed(0);
        }

        setQueueIndex(current => current + 1);
    }

    const previousSong = async () => {
        if (globalPlayerReference.current.getCurrentTime() > 3 && !currentSong.dummy) {
            globalPlayerReference.current.seekTo(0);
        } else {
            setQueueIndex(current => Math.max(-1, current - 1));
        }
    }

    const addToQueue = async (song) => {
        // If the last song is not the same as the song we are trying to queue, add it to the queue
        if (!song.dummy && queue[queue.length - 1]?.url != song.url) {
            setQueue(current => [...current, song]);
            if ((await currentSong).dummy) {
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
            setCurrentSong(Song.create(undefined, "playerContext"));
        }

        else if (queue.length > 0) {
            setCurrentSong(queue[queueIndex]);
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