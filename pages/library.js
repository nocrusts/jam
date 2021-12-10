import { useContext } from 'react';
import SongRow from '../components/SongRow';
import { SongLibrary } from '../stores/songLibrary';


const Library = () => {
    const { library } = useContext(SongLibrary);

    return (
        <div className="page">
            <div className="container">
                <h1>Library</h1>
                <hr />

                {
                    library.map((song, i) => (
                        <SongRow key={i} index={i} song={song} />
                    ))
                }

            </div>
        </div>
    );
}

export default Library;