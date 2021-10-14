import styles from "../styles/MusicPlayer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faCirclePause,
    faVolumeLow,
    faVolumeHigh,
    faVolumeMute
} from "@fortawesome/free-solid-svg-icons";

import ReactPlayer from "react-player/youtube";
import { useState, useEffect, useContext } from "react";

import { PlayerContext } from "../stores/playerContext";

const MusicPlayer = () => {

    const {
        playing,
        currentSong,
        setPlaying,
        played,
        setPlayed,
        seeking,
        setSeeking,
        globalPlayerReference
    } = useContext(PlayerContext);

    const [volume, setVolume] = useState(0);

    const adjustVolume = (percent) => {
        setVolume(preVolume => Math.min(100, Math.max(0, preVolume + percent)));
        window.localStorage.getItem("volume")
    };

    // Initialize the player (volume + keybinds)
    useEffect(() => {
        setVolume(Number(window.localStorage.getItem("volume") || "50"));

        const handleKeyPress = (e) => {
            if (e.key == "ArrowUp") {
                adjustVolume(5);
            }

            if (e.key == "ArrowDown") {
                adjustVolume(-5);
            }

            if (e.key == " ") {
                togglePlay();
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    function togglePlay(e) {
        setPlaying(currentState => !currentState);
    }

    function handleSeekMouseDown() {
        setSeeking(true);
    }

    function handleSeekChange(e) {
        setPlayed(parseFloat(e.target.value));
    }

    function handleSeekMouseUp(e) {
        setSeeking(false);
        globalPlayerReference.current.seekTo(parseFloat(e.target.value));
    }

    function handleProgress(state) {
        if (!seeking) {
            setPlayed(state.played);
        }
    }

    function handleVolumeChange(e) {
        let newVolume = parseInt(e.target.value);

        setVolume(newVolume);
        window.localStorage.setItem("volume", newVolume);
    }



    return (
        <div className={styles.player}>

            <div className={styles.left}>
                <img className={styles.thumbnail} src={currentSong.thumbnail ?? "/stock.png"} alt="album" />
                <div className={styles.label}>
                    <span className={styles.title}>
                        <a href={currentSong.url} target="_blank" rel="noreferrer" className="link">
                            {currentSong.title ?? "Song!"}
                        </a>
                    </span>
                    <span className={styles.artist}>
                        {currentSong.artist ?? "Unknown"}
                    </span>
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.playPause}
                    onClick={togglePlay}
                    onKeyDown={(e) => e.preventDefault()}
                >
                    <FontAwesomeIcon
                        icon={playing ? faCirclePause : faCirclePlay}
                        size="2x"
                    />
                </button>

                <div className={styles.durationBar}>
                    <input
                        className={styles.seek}
                        type="range" min={0} max={0.999999} step="any"
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        onKeyDown={event => event.preventDefault()}
                        style={{
                            background: 'linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ' + played * 100 + '%, rgba(255, 255, 255, 0.1) ' + played * 100 + '%, transparent 140%)'
                        }}
                    />
                </div>

            </div>

            <div className={styles.right}>

                <FontAwesomeIcon
                    icon={
                        volume > 0 ?
                            (volume > 50 ? faVolumeHigh
                                : faVolumeLow)
                            : faVolumeMute
                    }
                    size="sm"
                />

                <input
                    className={styles.volume}
                    type="range" min={0} max={100} step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                    onKeyDown={event => event.preventDefault()}
                    style={{
                        background: 'linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ' + volume + '%, rgba(255, 255, 255, 0.1) ' + volume + '%, transparent 140%)'
                    }}
                />

            </div>

            <div className={styles.backend}>
                <ReactPlayer
                    ref={globalPlayerReference}
                    url={currentSong.url}
                    playing={playing}
                    controls={false}
                    playsinline={false}
                    pip={false}
                    volume={volume / 100}
                    onProgress={handleProgress}
                    config={
                        {
                            youtube: {
                                playerVars: {
                                    autoplay: 0,
                                    modestbranding: 1,
                                    showinfo: 0,
                                    disablekb: 1
                                }
                            }
                        }
                    }
                />
            </div>
        </div >
    );
}

export default MusicPlayer;