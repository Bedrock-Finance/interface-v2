import styles from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Bedrock Finance Officially Launches Blog | Bedrock Finance',
    description: 'In this arcticle we discuss the accomplishments of Bedrock Finance and what is to come of the future.',
}


export default function Arcticle() {
    return (
        <div className={styles.article}>
            <p className={styles.articleType}>Learn</p>
            <p className={styles.articleName}>What Are Token Decimals?</p>
            <p className={styles.articleDetails}>Henry, Founder — January 16th 2024</p>
            <div className={styles.articleContent}>
            <p className={styles.sectionTitle}>What are decimals in crypto?</p>
            <p>Decimals are a unit for cryptocurrencies to measure the minimum divisible amount of a certain cryptocurrency. For example, the United States Dollar (USD) has two decimals. This means the minimum divisible amount is 0.01 USD. You can also think of decimals as the amount of decimals places the minimum divisive share is.</p>
            <p>Bitcoin has 8 decimals, with the minimum division being a satoshi (named after bitcoin’s developer, Satoshi Nakamoto), or  0.00000001 BTC.</p>
            <p>Ethereum has 18 decimals, with the minimum division being a wei (named after Wei Dai, an influential cryptographer), or  0.000000000000000001 ETH.</p>
            <p className={styles.sectionTitle}>What should I make my tokens decimals?</p>
            <p>Decimals can be made from 0-18, meaning the smallest division of your token could be 1 or 0.000000000000000001. Having smaller decimals can make it harder for people to transfer small amounts of your token, especially if the price is high or the supply is low. Some external integrations can break if decimals are a number other than 18, as they assume 18 decimal places.</p> 
            <p className={styles.sectionTitle}>Key Facts</p>
            <p>✅ Decimals are a unit for cryptocurrencies to measure the minimum divisible amount of a certain cryptocurrency</p>
            <p>✅ Bedrock Finance defaults to 18 decimals when there is no input.</p>
            <p>✅ Applications made by Bedrock Finance do not assume that there are 18 decimals.</p>
            <p>✅ Bedrock Finance allows decimals from 0-18, as these are the maximum limits. Other token creation applications have smaller limits.</p>
            <p>⛔ Bedrock Finance does not charge any extra for adding custom token decimals.</p>
            </div>
        </div >
    )
}