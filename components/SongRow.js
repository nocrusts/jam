import { useContext } from "react";
import { PlayerContext } from "../stores/playerContext";
import styles from "../styles/SongRow.module.css";
import labelStyles from "../styles/MusicPlayer.module.css";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

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
                    <FontAwesomeIcon icon={playing && sameSong() ? faPause : faPlay} size={"xs"} />
                    <span>{
                        (sameSong()) ? (
                            <img src={"/disco.gif"} width={30} height={30} />
                        ) : (
                            props.index + 1
                        )
                    }</span>
                </div>
                <div className={styles.img}>
                    <img src={props.song.thumbnail} alt="" />
                </div>
                <div className={styles.label}>
                    <span className={labelStyles.title} style={sameSong() ? { color: "rgb(var(--accent))" } : {}}>{props.song.title}</span>
                    <span className={labelStyles.artist}>{props.song.artist}</span>
                </div>
                <span></span>
            </span>
            <span className={styles.right}>
                <button className="btn" onClick={() => addToQueue(props.song)}>queue</button>
            </span>
        </div>
    );
}

export default SongRow;