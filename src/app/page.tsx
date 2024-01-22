"use client"

import styles from "./page.module.css";

import Image from "next/image";

import { NavbarMain } from "@/Components/navbarMain/navbarMain";
import { Footer } from "@/Components/footer/footer";

import Link from "next/link";

export default function Home() {
    return (
        <>
            <NavbarMain/>
            <div className={styles.topSection}>
                <div className={styles.homeTitleContainer}>
                    <p className={styles.homeTitle}>The </p>
                    <p className={`${styles.homeTitle} ${styles.accentWord}`}>Cheapest </p>
                    <p className={styles.homeTitle}>Launchpad</p>
                </div>
                <p className={styles.homeSubtitle}>Launch your token on the leading multichain launchpad</p>
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
            <div className={styles.app}>
                <div className={styles.appSection}>
                    <p className={styles.appTitle}>Multisender</p>
                    <p className={styles.appDescription}>Send tokens and coins in a single transaction, reducing gas fees signifigantly. Airdrop tokens and coins to users or send payments to friends without any service fee, and availibility to test it out on testnet.</p>
                    <a href="/app/multisender" className={styles.appButton}>Launch</a>
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
                            <p>✅ Launch BedrockMint v1 on another chain</p>
                            <p>✅ Create Discord, YouTube and Twitter</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>Q2 2024</h2>
                            <p>⏳ Develop and launch BedrockMint v2 on two chains</p>
                            <p>✅ Complete major UI/UX updates</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>S2 2024</h2>
                            <p>⏳ Launch BedrockMint v2 on another chain</p>
                            <p>✅ Build blog</p>
                        </div>
                    </div>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineContent}>
                            <h2>2025</h2>
                            <p>❌ Launch Bedrock Finance $BDRK</p>
                            <p>✅ Launch a second Dapp along with BedrockMint</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.blog}>
            <p className={styles.roadmapHeading}>Blog</p>
            <Link href="/blog/decimals">
            <div className={styles.arcticle}>
                <p className={styles.title}>What are token decimals?</p>
                <p className={styles.arcticleDesc}>Learn what token decimals are and how to use them to make your token better.</p>
                <p className={styles.arcticleDetails}>Henry - January 16th, 2023</p>
            </div>
            </Link>
            <Link href="/blog/blog-launch">
            <div className={styles.arcticle}>
                <p className={styles.title}>Bedrock Finance Officially Launches Blog</p>
                <p className={styles.arcticleDesc}>To expand Bedrock Finance&apos;s impact and reach for news, we officially launch our blog with all updates of Bedrock Finance.</p>
                <p className={styles.arcticleDetails}>Henry - January 13th, 2023</p>
            </div>
            </Link>
            </div>
            <br></br>
            <Footer />
        </>
    )
}