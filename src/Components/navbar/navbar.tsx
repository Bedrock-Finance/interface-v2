"use client";

import styles from "./navbar.module.css";
import { useState, useEffect, MouseEventHandler } from "react";

import Image from 'next/image'

import {
  useAccount,
  useConnect,
} from 'wagmi'

import { useIsMounted } from "usehooks-ts";

import { Overlay } from "../overlay/overlay";

export function Profile() {
  const isMounted = useIsMounted();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();


  return (
    <div className={styles.connectionOptions}>
      <p className={styles.connectionHeading}>Connect to Bedrock</p>
      {connectors.map((connector) => (
        <button
          disabled={isMounted() ? !connector.ready : false}
          key={connector.id}
          onClick={() => connect({ connector })}
          className={styles.connectionOption}
        >
          {connector.name}
          {(!connector.ready && isMounted()) && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [connectOpen, setConnectOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false)

  const { address, isConnected } = useAccount();

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  const toggleConnectOpen = () => {
    setConnectOpen(!connectOpen);
    console.log(connectOpen);
  };

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <nav>
  {!isConnected && connectOpen && <Overlay onClick={toggleConnectOpen}/>}
  {!isConnected && connectOpen && <Profile />}
  <div className={styles.desktop}>
    {isClient ? isConnected ?
      <p className={`${styles.navbarLi} ${styles.connectButton}`}>{address ? (address?.slice(0, 6) + "..." + address?.slice(-4)) : "Error"}</p>
      :
      <p className={`${styles.navbarLi} ${styles.connectButton}`} onClick={toggleConnectOpen}>Connect</p>
      :
      <p className={`${styles.navbarLi} ${styles.connectButton}`}>Loading...</p>
    }
    <p className={styles.navbarLi}><a href="/factory">BedrockMint</a></p>
    <p className={styles.navbarLi}><a href="/mytokens">My Tokens</a></p>
    <p className={`${styles.navLeft} ${styles.navbarLi}`}>
      <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={35} height={35} />
      <a className={`${styles.active}`} href="/">Bedrock</a>
    </p>
  </div>
  <div className={styles.mobile}>
    <p className={`${styles.navLeft} ${styles.navbarLi}`}>
      <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={35} height={35} />
      <a className={`${styles.active}`} href="/">Bedrock</a>
    </p>
    <p className={`${styles.navbarLi}`} aria-label="Toggle Menu" onClick={toggleMenuOpen}>☰</p>
    {isClient ? isConnected ?
      <p className={`${styles.navbarLi} ${styles.connectButton}`}>{address ? (address?.slice(0, 6) + "..." + address?.slice(-4)) : "Error"}</p>
      :
      <p className={`${styles.navbarLi} ${styles.connectButton}`} onClick={toggleConnectOpen}>Connect</p>
      :
      <p className={`${styles.navbarLi} ${styles.connectButton}`}>Loading...</p>
    }
  </div>
  <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
    <p className={styles.navElement}><a href="/factory">BedrockMint</a></p>
    <p className={styles.navElement}><a href="/mytokens">My Tokens</a></p>
  </div>
</nav>
  );
};
