import { useEffect, useState } from 'react';
import SongRow from '../components/SongRow';
import Song from '../objects/Song';


const Library = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const loadSongs = async () => {
            let songs = [];

            if (localStorage.getItem('songs') === null) {
                songs = [
                    await Song.create("https://www.youtube.com/watch?v=yNNMKN9BUmU"),
                    await Song.create("https://www.youtube.com/watch?v=UlIgAGotomM"),
                    await Song.create("https://www.youtube.com/watch?v=QLCpqdqeoII"),
                    await Song.create("https://www.youtube.com/watch?v=h2jvHynuMjI"),
                    await Song.create("https://www.youtube.com/watch?v=C3DlM19x4RQ"),
                    await Song.create("https://www.youtube.com/watch?v=GFf5qIfbGcA"),
                    await Song.create("https://www.youtube.com/watch?v=oOVKL6IcGkE"),
                    await Song.create("https://www.youtube.com/watch?v=KAcNcREEONY")
                ]

                localStorage.setItem('songs', JSON.stringify(songs));
                console.log("Songs:", songs)
            } else {
                songs = JSON.parse(localStorage.getItem('songs'));
            }

            setSongs(songs);
        }

        loadSongs();
    }, [])

    return (
        <div className="page">
            <div className="container">
                <h1>Library</h1>
                <hr />

                {
                    songs.map((song, i) => (
                        <SongRow key={i} index={i} song={song} />
                    ))
                }

            </div>
        </div>
    );
}

export default Library;