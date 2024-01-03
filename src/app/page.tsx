import styles from "./page.module.css";

import Image from "next/image";

export const metadata = {
    title: "Home | Create no-code cryptocurrencies"
}

export default function Home() {
    return (
        <>
            <div className={styles.topSection}>
                <div className={styles.homeTitleContainer}>
                    <p className={styles.homeTitle}>The </p>
                    <p className={`${styles.homeTitle} ${styles.accentWord}`}>Cheapest </p>
                    <p className={styles.homeTitle}>Launchpad</p>
                </div>
                <p className={styles.homeSubtitle}>Launch your token on the easiest to use multichain launchpad</p>
                <a href="/app/factory" className={styles.create}>Create A Token</a>
            </div>
            <div className={`${styles.topSection} ${styles.polygonLogo}`}>
                <Image src="/assets/polygon-badge.png" alt="polygon" width={300} height={300} className={styles.polygonImage} />
            </div>
            <p className={styles.appHeader}>Apps</p>
            <div className={styles.app}>
                <div className={styles.appSection}>
                    <p className={styles.appTitle}>BedrockMint v1</p>
                    <p className={styles.appDescription}>Build your own pre-audited cryptocurrency within seconds. Bedrock uses complex algorithms to ensure that your token is safe, gas efficient, and has no differences compared to non-automated contracts.</p>
                    <a href="/app/factory" className={styles.appButton}>Launch</a>
                </div>
                <div className={styles.appSection}>
                    <div className={styles.statistic}>
                        <p className={styles.statisticNumber}>2</p>
                        <p className={styles.statisticName}>Chains Online</p>
                    </div>
                </div>
            </div>
            <div className={styles.roadmap}>
                <p className={styles.roadmapHeading}>Roadmap</p>
                <p>See what we&apos;ve accomplished and what&apos;s in store for Bedrock Finance.</p>
                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>Q4 2023</h2>
                            <p>✅ Launch BedrockMint v1 on Fantom (FTM)</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>Q1 2024</h2>
                            <p>✅ Add more wallet connection options</p>
                            <p>⏳ Launch BedrockMint v1 two more chains</p>
                            <p>✅ Create Discord, YouTube and Twitter</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>Q2 2024</h2>
                            <p>❌ Develop and launch BedrockMint v2 on three chains</p>
                            <p>✅ Complete major UI/UX updates</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>S2 2024</h2>
                            <p>❌ Launch BedrockMint v2 on two more chains</p>
                            <p>❌ Build blog and newsletter</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>2025</h2>
                            <p>❌ Launch Bedrock Finance $BDRK</p>
                            <p>❌ Build crypto blog</p>
                            <p>❌ Launch a second Dapp along with BedrockMint</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}