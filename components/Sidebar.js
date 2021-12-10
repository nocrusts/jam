import styles from "../styles/Sidebar.module.css";
import MenuItem from "./MenuItem";
import MusicPlayer from "./MusicPlayer";
import SearchBar from "./Searchbar";

const Sidebar = ({ children }) => {
    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <h1 className={styles.title}>Jam</h1>

                <SearchBar placeholder="Search" />

                <MenuItem title="Home" href="/" />
                <MenuItem title="Browse" href="/browse" />
                <MenuItem title="Library" href="/library" />
            </div>
            <div className={styles.content}>
                <nav></nav>
                <div className={styles.scrollable}>
                    {children}
                </div>
            </div>
            <MusicPlayer />
        </div>
    );
}

export default Sidebar;