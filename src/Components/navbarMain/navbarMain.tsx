import styles from "./navbarMain.module.css";

import Image from 'next/image'
import Link from "next/link";

export function NavbarMain(){

  return (
    <nav>
      <div className={styles.navbar}>
          <Link href="/app/factory">
            <div className={`${styles.navbarLi} ${styles.connectButton}`}>
              <p className={styles.connectText}>Launch App</p>
            </div>
          </Link>
          <Link href="/blog">
            <p className={`${styles.navbarLi} ${styles.active}`}>
              Blog
            </p>
          </Link>
        <Link href="/" className={`${styles.navLeft} ${styles.navbarLi} ${styles.active}`}>
          <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={24} height={24} />
        </Link>
      </div>
    </nav>
  );
};
