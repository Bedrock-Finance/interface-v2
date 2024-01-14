import styles from "./page.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Bedrock Finance Officially Launches Blog | Bedrock Finance',
    description: 'In this arcticle we discuss the accomplishments of Bedrock Finance and what is to come of the future.',
}


export default function Arcticle() {
    return (
        <div className={styles.article}>
            <p className={styles.articleType}>News</p>
            <p className={styles.articleName}>Bedrock Finance Officially Launches Blog</p>
            <p className={styles.articleDetails}>Henry, Founder — January 13th 2024</p>
            <div className={styles.articleContent}>
            <p className={styles.sectionTitle}>Our Accomplishments</p>
            <p>One month ago, Bedrock Finance launched BedrockMint v1 on Fantom. Over the past month we’ve grown significantly, not without your help, of course.</p>
            <p>The past month has been full with exciting events for us including…</p>
            <li>Launched BedrockMint v1 on Polygon and Fantom</li>
            <li>Launched Multisender on Polygon and Fantom</li>
            <li>Grown our twitter account to over 200 followers including Fantom Foundation</li>
            <li>Formed partnerships which many projects on Fantom</li>
            <li>Helped create 25 tokens across Fantom and Polygon</li>
            <li>Save money on gas fees through our multisender</li>
            <p>And more will just keep coming!</p>
            <p className={styles.sectionTitle}> What’s Next</p>
            <p>We plan to scale and grow Bedrock to a staple of cryptocurrency and Dapps, bringing use cases to cryptocurrency and supporting the true decentralization of finance.Our next plan of action is turning Bedrock Finance from a project to a company.To do that we need things like this blog, a token, new UI, and better branding.</p>
            <p>After that we will launch BedrockMint v2, incorporating transfer taxes, and burning which has been requested many times.So let’s get to it!</p>
            <p className={styles.sectionTitle}>Thank You</p>
            <p>Thank you for supporting us! Do not hesitate to reach out to us for any questions or concerns (contact@bedrockfi.org), or we hope to see you again soon!</p>
            </div>
        </div >
    )
}