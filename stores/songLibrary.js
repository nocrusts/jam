import { createContext, useState, useRef, useEffect } from "react";
import Song from "../objects/Song";

const SongLibrary = createContext();

const SongLibraryProvider = ({ children }) => {
    const [library, setLibrary] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const loadSongs = async () => {
            let songs = [];

            if (localStorage.getItem('library') === null) {
                songs = [
                    await Song.create("yNNMKN9BUmU", "songLibrary"),
                    await Song.create("UlIgAGotomM", "songLibrary"),
                    await Song.create("QLCpqdqeoII", "songLibrary"),
                    await Song.create("h2jvHynuMjI", "songLibrary"),
                    await Song.create("C3DlM19x4RQ", "songLibrary"),
                    await Song.create("GFf5qIfbGcA", "songLibrary"),
                    await Song.create("oOVKL6IcGkE", "songLibrary"),
                    await Song.create("KAcNcREEONY", "songLibrary")
                ]

                localStorage.setItem('library', JSON.stringify(songs));
                console.log("Songs:", songs)
            } else {
                songs = JSON.parse(localStorage.getItem('library'));
            }

            setLibrary(songs);
        }

        loadSongs();
    }, []);

    return (
        <SongLibrary.Provider value={{
            library, setLibrary,
            playlists, setPlaylists
        }}>{children}</SongLibrary.Provider>
    );
}

export { SongLibrary, SongLibraryProvider };