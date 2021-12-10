import { useContext } from "react";
import { PlayerContext } from "../stores/playerContext";
import styles from "../styles/SongRow.module.css";
import labelStyles from "../styles/MusicPlayer.module.css";

import {
    FaPlay as PlayIcon,
    FaPause as PauseIcon
} from "react-icons/fa";

import { BiAddToQueue as QueueButton } from 'react-icons/bi';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SongRow = (props) => {
    const {
        setCurrentSong,
        setPlaying,
        globalPlayerReference,
        currentSong,
        playing,
        addToQueue
    } = useContext(PlayerContext);

    const sameSong = () => {
        return currentSong.url === props.song.url
    }

    const clickedSong = () => {
        if (sameSong()) {
            if (playing) {
                setPlaying(false);
            } else {
                setPlaying(true);
            }
        } else {
            setCurrentSong(props.song);
            setPlaying(true);
            globalPlayerReference.current.seekTo(0);
        }
    }

    return (
        <div className={styles.songRow}>
            <span
                onClick={() => {
                    clickedSong()
                }}
                className={styles.left}
            >
                <div className={styles.index}>
                    {
                        playing && sameSong() ? <PauseIcon size="0.75em" /> : <PlayIcon size="0.75em" />
                    }

                    <span>{
                        (sameSong()) ? (
                            <img src={"/disco.gif"} width={30} height={30} />
                        ) : (
                            props.index + 1
                        )
                    }</span>
                </div>
                <div className={styles.img}>
                    <img src={props.song.thumbnail ?? "/stock.png"} alt="" />
                </div>
                <div className={styles.label}>
                    <span className={labelStyles.title} style={sameSong() ? { color: "rgb(var(--accent))" } : {}}>{props.song.title ?? <Skeleton />}</span>
                    <span className={labelStyles.artist}>{props.song.artist ?? <Skeleton />}</span>
                </div>
            </span>
            <span className={styles.right}>
                <button className="btn" onClick={() => addToQueue(props.song)}>
                    <QueueButton size="1.5em" />
                </button>
            </span>
        </div>
    );
}

export default SongRow;