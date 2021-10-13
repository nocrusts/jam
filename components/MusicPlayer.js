import styles from "../styles/MusicPlayer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player/youtube";

import { useState, useEffect } from "react";

const MusicPlayer = () => {

    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);


    useEffect(() => {
        let volumeLocal = 50;

        window.addEventListener("keydown", (e) => {

            console.log(e.key);

            if (e.key == "ArrowUp" && volumeLocal < 100) {
                volumeLocal += 5;
                setVolume(volumeLocal / 100);
            }

            else if (e.key == "ArrowDown" && volumeLocal > 0) {
                volumeLocal -= 5;
                setVolume(volumeLocal / 100);
            }
        });
    }, []);

    return (
        <div className={styles.player}>

            <div className={styles.left}>
                Details
            </div>

            <div className={styles.controls}>
                <button className={styles.playPause} onClick={function () { setPlay(!playing) }}>
                    <FontAwesomeIcon
                        icon={
                            playing ? faCirclePause : faCirclePlay
                        }
                        size="2x"
                    />
                </button>
            </div>

            <div className={styles.right}>
                Adjust Volume: {Math.floor(volume * 100)}%
            </div>

            <div className={styles.backend}>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=GFf5qIfbGcA"
                    playing={playing}
                    controls={false}
                    playsinline={false}
                    pip={false}
                    volume={volume}
                />
            </div>
        </div >
    );
}

export default MusicPlayer;