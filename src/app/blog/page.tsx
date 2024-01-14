import styles from "./page.module.css";

import Link from "next/link";

export default function Blog() {
    return (
        <Link href="/blog/blog-launch">
        <div className={styles.blog}>
            <p className={styles.blogHeader}>News</p>
            <div className={styles.arcticle}>
                <p className={styles.title}>Bedrock Finance Officially Launches Blog</p>
                <p className={styles.arcticleDesc}>To expand Bedrock Finance&apos;s impact and reach for news, we officially launch our blog with all updates of Bedrock Finance.</p>
                <p className={styles.arcticleDetails}>Henry - January 13th, 2023</p>
            </div>
        </div>
        </Link>
    )
}