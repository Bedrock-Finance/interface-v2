import styles from "./footer.module.css";

import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Socials</p>
            <Link target="_blank" href="https://twitter.com/BDRKFI" className={styles.footerElement}>
                <Image src="/assets/icons/square-x-twitter.svg" alt="twitter" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>X / Twitter</p>
            </Link>
            <Link target="_blank" href="https://github.com/Bedrock-Finance" className={styles.footerElement}>
                <Image src="/assets/icons/github.svg" alt="github" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>Github</p>
            </Link>
            <Link target="_blank" href="https://www.youtube.com/@bedrockfi" className={styles.footerElement}>
                <Image src="/assets/icons/youtube.svg" alt="youtube" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>YouTube</p>
            </Link>
            <Link target="_blank" href="https://discord.gg/3rTXvSRasK" className={styles.footerElement}>
                <Image src="/assets/icons/discord.svg" alt="discord" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>Discord</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Apps</p>
            <Link target="_blank" href="/app/factory" className={styles.footerElement}>
                <Image src="/assets/icons/microchip-solid.svg" alt="bdrkmint v1" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>BedrockMint v1</p>
            </Link>
            <Link target="_blank" href="/app/mytokens" className={styles.footerElement}>
                <Image src="/assets/icons/coins-solid.svg" alt="my tokens" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>My Tokens</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Support</p>
            <Link target="_blank" href="mailto:contact@bedrockfi.org" className={styles.footerElement}>
                <Image src="/assets/icons/phone-solid.svg" alt="contact" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>contact@bedrockfi.org</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Founder</p>
            <Link target="_blank" href="mailto:henry@bedrockfi.org" className={styles.footerElement}>
                <Image src="/assets/icons/envelope-solid.svg" alt="founder" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>henry@bedrockfi.org</p>
            </Link>
            </div>
        </footer>
    )
}