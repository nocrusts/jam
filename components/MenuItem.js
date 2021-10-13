import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "../styles/MenuItem.module.css";

// Params: href, title

const MenuItem = (params) => {

    const router = useRouter();
    const selectedClass = router.pathname == params.href ? styles.active : "";

    return (
        <Link href={params.href}>
            <a className={selectedClass + " " + styles.menuItem}>
                {params.title}
            </a>
        </Link>
    );
}

export default MenuItem;