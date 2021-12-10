import { useContext } from 'react';
import SongRow from '../components/SongRow';
import AsyncSongRow from '../components/AsyncSongRow';
import Song from '../objects/Song';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from "../lib/fetcher";
import { SongLibrary } from '../stores/songLibrary';

const Search = ({ data, notFound, blank }) => {

    const router = useRouter();
    const { library } = useContext(SongLibrary)

    const results = <>{
        notFound ? <code>API Quota Reached lol</code> :
            !data ? <code>Loading...</code> :
                data.items.map((item, i) => (
                    <AsyncSongRow key={i} index={i} promise={Song.create(item.id.videoId, "search")} />
                ))
    }</>

    return (
        <div className="page">
            <div className="container">
                <h1>{router.query.q ? `Searching for "${router.query.q}"` : "Search"}</h1>

                {
                    !blank ? results : <br />
                }

                <hr />

                <h2 className="heading">Library</h2>
                {
                    !library ? <code>Nothing...</code> :
                        library?.filter(song => {
                            if (!song.title || !router.query.q)
                                return false
                            return song.title?.toLowerCase().includes(router.query.q.toLowerCase());
                        }).map((song, i) => (
                            <SongRow key={i} index={i} song={song} />
                        ))
                }
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    if (context.query.q === "")
        return { props: { blank: true } }

    const key = process.env.YOUTUBE_API_KEY;
    const response = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + context.query.q + "&type=video&key=" + key);
    const json = await response.json();

    if (!json || json.error) {
        console.error("YouTube Response Error:", json.error)
        return { props: { notFound: true } };
    }

    return { props: { data: json } };
}

export default Search;