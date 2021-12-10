import Router from 'next/router';
import styles from "../styles/Searchbar.module.css";


const SearchBar = (params) => {

    const keyPressHandle = (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            Router.push({ pathname: '/search', query: { q: event.target.value } });
        }
    }

    return (
        <div className={styles.search}>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                <path d="M11.87 10.835c.018.015.035.03.051.047l3.864 3.863a.735.735 0 1 1-1.04 1.04l-3.863-3.864a.744.744 0 0 1-.047-.051 6.667 6.667 0 1 1 1.035-1.035zM6.667 12a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667z"></path>
            </svg>
            <input className={styles.input} placeholder={params.placeholder} onKeyDown={keyPressHandle} />
        </div>
    );
}

export default SearchBar;