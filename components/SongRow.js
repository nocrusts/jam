import { useContext } from "react";
import { PlayerContext } from "../stores/playerContext";
import styles from "../styles/SongRow.module.css";
import labelStyles from "../styles/MusicPlayer.module.css";

const SongRow = (props) => {
    const { setCurrentSong, setPlaying, globalPlayerReference } = useContext(PlayerContext);

    const clickedSong = () => {
        setCurrentSong(props.song);
        setPlaying(true);
        globalPlayerReference.current.seekTo(0);
    }

    return (
        <div
            className={styles.songRow}
            onClick={() => {
                clickedSong()
            }}
        >
            <span className={styles.left}>
                <div className={styles.index}>{props.index + 1}</div>
                <img src={props.song.thumbnail} alt="" width={50} height={50} />
                <div className={styles.label}>
                    <span className={labelStyles.title}>{props.song.title}</span>
                    <span className={labelStyles.artist}>{props.song.artist}</span>
                </div>
                <span></span>

            </span>
        </div>
    );
}

export default SongRow;