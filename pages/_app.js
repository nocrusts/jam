import Sidebar from '../components/Sidebar';
import { PlayerContextProvider } from '../stores/playerContext';
import { SongLibraryProvider } from '../stores/songLibrary';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <SongLibraryProvider>
            <PlayerContextProvider>
                <Sidebar>
                    <Component {...pageProps} />
                </Sidebar>
            </PlayerContextProvider>
        </SongLibraryProvider>
    )
}

export default MyApp
