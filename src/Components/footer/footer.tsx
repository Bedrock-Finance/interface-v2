import styles from "./footer.module.css";

import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Socials</p>
            <Link href="https://twitter.com/BDRKFI" className={styles.footerElement}>
                <Image src="/assets/icons/square-x-twitter.svg" alt="twitter" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>X / Twitter</p>
            </Link>
            <Link href="https://github.com/Bedrock-Finance" className={styles.footerElement}>
                <Image src="/assets/icons/github.svg" alt="github" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>Github</p>
            </Link>
            <Link href="https://www.youtube.com/channel/UCUETd0WFETVCapCy8TWsbaQ" className={styles.footerElement}>
                <Image src="/assets/icons/youtube.svg" alt="youtube" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>YouTube</p>
            </Link>
            <Link href="https://discord.gg/WrE7K4ZZMb" className={styles.footerElement}>
                <Image src="/assets/icons/discord.svg" alt="discord" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>Discord</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Apps</p>
            <Link href="/factory" className={styles.footerElement}>
                <Image src="/assets/icons/microchip-solid.svg" alt="bdrkmint v1" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>BedrockMint v1</p>
            </Link>
            <Link href="/mytokens" className={styles.footerElement}>
                <Image src="/assets/icons/coins-solid.svg" alt="my tokens" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>My Tokens</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Support</p>
            <Link href="mailto:contact@bedrockfi.org" className={styles.footerElement}>
                <Image src="/assets/icons/phone-solid.svg" alt="contact" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>contact@bedrockfi.org</p>
            </Link>
            </div>
            <div className={styles.footerSection}>
            <p className={styles.footerHeader}>Founder</p>
            <Link href="mailto:henry@bedrockfi.org" className={styles.footerElement}>
                <Image src="/assets/icons/envelope-solid.svg" alt="founder" height={25} width={25} className={styles.footerIcon} />
                <p className={styles.footerElementText}>henry@bedrockfi.org</p>
            </Link>
            </div>
        </footer>
    )
}