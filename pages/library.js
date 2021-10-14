import SongRow from '../components/SongRow';
import Song from '../objects/Song';


const Library = (props) => {
    return (
        <div className="page">
            <div className="container">
                <h1>Library</h1>
                <hr />

                {
                    props.songs.map((song, i) => (
                        <SongRow key={i} index={i} song={song} />
                    ))
                }

            </div>
        </div>
    );
}

export const getStaticProps = async () => {
    const songs = [
        await Song.create("https://www.youtube.com/watch?v=yNNMKN9BUmU"),
        await Song.create("https://www.youtube.com/watch?v=UlIgAGotomM"),
        await Song.create("https://www.youtube.com/watch?v=QLCpqdqeoII"),
        await Song.create("https://www.youtube.com/watch?v=h2jvHynuMjI"),
        await Song.create("https://www.youtube.com/watch?v=C3DlM19x4RQ"),
        await Song.create("https://www.youtube.com/watch?v=GFf5qIfbGcA"),
        await Song.create("https://www.youtube.com/watch?v=oOVKL6IcGkE")
    ]

    return {
        props: {
            songs: songs
        }
    }
}

export default Library;