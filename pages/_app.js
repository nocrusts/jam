import Sidebar from '../components/Sidebar';
import { PlayerContextProvider } from '../stores/playerContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <PlayerContextProvider>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </PlayerContextProvider>
    )
}

export default MyApp
