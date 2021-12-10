import { useEffect, useState } from 'react';
import SongRow from '../components/SongRow';
import Song from '../objects/Song';

import { useRouter } from 'next/router';

const Search = () => {

    const router = useRouter();

    const [songs, setSongs] = useState([]);

    // Filter song list by search query
    const filterSongs = (query) => {
        const filteredSongs = songs.filter(song => {
            return song.title.toLowerCase().includes(query.toLowerCase());
        });
        setSongs(filteredSongs);
    }

    useEffect(() => {
        const loadSongs = async () => {
            const songs = [
                await Song.create("https://www.youtube.com/watch?v=yNNMKN9BUmU"),
                await Song.create("https://www.youtube.com/watch?v=UlIgAGotomM"),
                await Song.create("https://www.youtube.com/watch?v=QLCpqdqeoII"),
                await Song.create("https://www.youtube.com/watch?v=h2jvHynuMjI"),
                await Song.create("https://www.youtube.com/watch?v=C3DlM19x4RQ"),
                await Song.create("https://www.youtube.com/watch?v=GFf5qIfbGcA"),
                await Song.create("https://www.youtube.com/watch?v=oOVKL6IcGkE"),
                await Song.create("https://www.youtube.com/watch?v=KAcNcREEONY")
            ]

            console.log("Songs:", songs)
            setSongs(songs);
        }

        loadSongs();
    }, [])

    return (
        <div className="page">
            <div className="container">
                <h1>{`Searching for "${router.query.q}"`}</h1>
                <hr />

                <h2 className="heading">Library</h2>
                {
                    songs.map((song, i) => (
                        <SongRow key={i} index={i} song={song} />
                    ))
                }

            </div>
        </div>
    );
}

export default Search;