import styles from "../styles/MusicPlayer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player/youtube";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {

    const [url, setUrl] = useState("https://www.youtube.com/watch?v=tOZkYsrX8JI");
    const [playing, setPlay] = useState(false);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(0);
    const [seeking, setSeeking] = useState(false);

    const [title, setTitle] = useState("Nothing Playing");
    const [thumbnail, setThumbnail] = useState("/stock.png");
    const [artist, setArtist] = useState("Unknown");

    const ref = useRef(null);

    useEffect(() => {
        // States read values aren't updated here...(workaround)
        let volumeLocal = parseInt(window.localStorage.getItem("volume"));
        volumeLocal = volumeLocal > -1 ? volumeLocal : 50;

        setVolume(volumeLocal / 100);

        function changeVolume(percent) {
            volumeLocal += percent;

            window.localStorage.setItem("volume", volumeLocal);
            setVolume(volumeLocal / 100);
        }

        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" && volumeLocal < 100) {
                changeVolume(5);
            } else if (e.key == "ArrowDown" && volumeLocal > 0) {
                changeVolume(-5);
            }
        });
    }, []);

    function handleSeekMouseDown() {
        setSeeking(true);
    }

    function handleSeekChange(e) {
        setPlayed(parseFloat(e.target.value));
    }

    function handleSeekMouseUp(e) {
        setSeeking(false);
        ref.current.seekTo(parseFloat(e.target.value));
    }

    function handleProgress(state) {
        if (!seeking) {
            setPlayed(state.played);
        }
    }

    function getVideoDetails() {
        fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
            .then(res => res.json())
            .then(json => {
                setTitle(json.title);
                setThumbnail(json.thumbnail_url);
                setArtist(json.author_name);
            });
    }

    return (
        <div className={styles.player}>

            <div className={styles.left}>
                <img className={styles.thumbnail} src={thumbnail} />
                <div className={styles.label}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.artist}>{artist}</span>
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={styles.playPause}
                    onClick={function () { setPlay(!playing) }}
                >
                    <FontAwesomeIcon
                        icon={playing ? faCirclePause : faCirclePlay}
                        size="2x"
                    />
                </button>
                <input
                    className={styles.seek}
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
            </div>

            <div className={styles.right}>
                Volume: {Math.floor(volume * 100)}%
            </div>

            <div className={styles.backend}>
                <ReactPlayer
                    ref={ref}
                    url={url}
                    playing={playing}
                    controls={false}
                    playsinline={false}
                    pip={false}
                    volume={volume}
                    onReady={getVideoDetails}
                    onProgress={handleProgress}
                />
            </div>
        </div >
    );
}

export default MusicPlayer;