import styles from "./navbar.module.css";

import Link
 from "next/link";
export const VerticalNavbar = () => {
    return(
        <nav className={styles.navbar}>
            <Link href="/app/factory">
                <p>BedrockMint</p>
            </Link>
            <Link href="/app/factory">
                <p>My Tokens</p>
            </Link>
        </nav>
    )
}