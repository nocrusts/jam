import styles from "../styles/MusicPlayer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faCirclePause,
    faVolumeLow,
    faVolumeHigh,
    faVolumeMute,
    faForward,
    faBackward
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
        globalPlayerReference,
        nextSong,
        previousSong
    } = useContext(PlayerContext);

    const [volume, setVolume] = useState(0);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

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
        setTime(Math.floor(parseFloat(e.target.value) * duration));
    }

    function handleSeekMouseUp(e) {
        setSeeking(false);
        globalPlayerReference.current.seekTo(parseFloat(e.target.value));
    }

    function handleProgress(state) {
        if (!seeking) {
            setPlayed(state.played);
            setTime(Math.floor(
                globalPlayerReference.current.getCurrentTime()
            ));

            setDuration(Math.floor(
                globalPlayerReference.current.getDuration()
            ));
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
                <div className={styles.thumbnail}>
                    <img src={currentSong.thumbnail ?? "/stock.png"} alt="album" />
                </div>

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
                <span className="center-row">
                    <button
                        className={styles.controlButtons}
                        onClick={previousSong}
                        onKeyDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={faBackward}
                            size="1x"
                        />
                    </button>

                    <button
                        className={styles.controlButtons}
                        onClick={togglePlay}
                        onKeyDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={playing ? faCirclePause : faCirclePlay}
                            size="2x"
                        />
                    </button>

                    <button
                        className={styles.controlButtons}
                        onClick={nextSong}
                        onKeyDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon
                            icon={faForward}
                            size="1x"
                        />
                    </button>
                </span>


                <div className={styles.durationBar}>
                    <span>{
                        currentSong.dummy ? "--:--" :
                            Math.floor(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60
                    }</span>
                    <input
                        className={styles.seek}
                        type="range" min={0} max={0.999999} step="any"
                        value={played}
                        onMouseDown={handleSeekMouseDown}
                        onChange={handleSeekChange}
                        onMouseUp={handleSeekMouseUp}
                        onKeyDown={event => event.preventDefault()}
                        style={{
                            background: 'linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ' + played * 100 + '%, rgba(255, 255, 255, 0.1) ' + played * 100 + '%, transparent 300%)'
                        }}
                    />
                    <span>-{
                        currentSong.dummy ? "--:--" :
                            Math.floor((duration - time) / 60) + ":" + ((duration - time) % 60 < 10 ? "0" : "") + (duration - time) % 60
                    }</span>
                </div>

            </div >

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
                        background: 'linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ' + volume + '%, rgba(255, 255, 255, 0.1) ' + volume + '%, transparent 300%)'
                    }}
                />

            </div>

            <div className={styles.backend}>
                <ReactPlayer
                    ref={globalPlayerReference}
                    url={currentSong.url}
                    width={0}
                    height={0}
                    playing={playing}
                    controls={false}
                    playsinline={false}
                    pip={false}
                    volume={volume / 100}
                    onEnded={() => nextSong()}
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