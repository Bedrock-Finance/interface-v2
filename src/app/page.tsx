import styles from "./page.module.css";

import Image from "next/image";

export const metadata = {
    title: 'Home | Bedrock Finance | Create No-Code Cryptocurrencies',
    description: 'With Bedrock Finance you can tokenize assets in seconds. Tokens are gas efficient, safe and have undergone extensive testing.',
}

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.half}>
                    <p className={styles.homeTitle}>Bedrock Finance</p>
                    <p className={styles.homeSubtitle}>A strong foundation for your web3 journey</p>
                    <a href="/factory" className={styles.create}>Create an ERC-20 Token</a>
                </div>
                <div className={`${styles.half} ${styles.image}`}>
                    <Image src="/assets/btcworld3d.png" className={styles.bitcoin} alt="bitcoin graphic" width={250} height={250} />
                </div>
                <div className={styles.app}>
                    <div className={styles.app1}>
                        <p>Made By Bedrock</p>
                        <p className={styles.appTitle}>ERC-20 Token Factory v1</p>
                        <p className={styles.appDescription}>Build your own pre-audited cryptocurrency within seconds. Bedrock uses complex algorithms to ensure that your token is safe, gas efficient, and has no differences compared to non-automated contracts.</p>
                        <p>Chains supported: Fantom (FTM), Polygon (MATIC)</p>
                        <a href="/factory" className={styles.appButton}>Launch</a>
                    </div>
                </div>
                <div className={styles.roadmap}>
                    <div className={styles.roadmaptext}>
                        <p className={styles.roadmapsheading}>Advancing</p>
                        <p className={styles.roadmapheading}>Project Roadmap</p>
                        <p className={styles.roadmapdescription}>
                            See our previous feats and upcoming projects in advance to know what&apos;s going on behind the scenes.
                        </p>
                        <div style={{ position: "relative", width: "90%", height: "100%"}} >
                            <Image alt="bitcoin graphic" className={styles.astronaut} src="/assets/btc3d.png" layout="fill" objectFit="contain" />
                        </div>
                    </div>
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
                                <p>⏳Launch on two more chains</p>
                                <p>❌Create Discord, YouTube and Twitter</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineContent}>
                                <h2>Q2 2024</h2>
                                <p>❌Develop and launch BedrockMint v2 on three chains</p>
                                <p>✅Complete major UI/UX updates</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineContent}>
                                <h2>S2 2024</h2>
                                <p>❌Launch BedrockMint v2 on two more chains</p>
                                <p>❌Build blog and newsletter</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineContent}>
                                <h2>2025</h2>
                                <p>❌Launch Bedrock Finance $BDRK</p>
                                <p>❌Build crypto blog</p>
                                <p>❌Launch a second Dapp along with BedrockMint</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}