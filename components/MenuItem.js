import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "../styles/MenuItem.module.css";

// Params: href, title

const MenuItem = (params) => {

    const router = useRouter();

    return (
        <Link href={params.href}>
            <a
                className={
                    (router.pathname == params.href ? styles.active : "") + " " + styles.menuItem
                }
            >
                {params.title}
            </a>
        </Link>
    );
}

export default MenuItem;