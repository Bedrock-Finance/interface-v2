"use client";

import styles from "./navbar.module.css";
import { useState, useEffect, MouseEventHandler } from "react";

import Image from 'next/image'
import Link from "next/link";

import {
  useAccount,
  useConnect,
  useDisconnect
} from 'wagmi'

import { useIsMounted } from "usehooks-ts";

import { Overlay } from "../overlay/overlay";

export function Profile() {
  const isMounted = useIsMounted();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();


  return (
    <div className={styles.connectionOptions}>
      <p className={styles.connectionHeading}>Connect Wallet</p>
      <p className={styles.connectionDesc}>Interact with Bedrock Finance by connecting a Web3 Wallet</p>
      {connectors.map((connector) => (
        <button
          disabled={isMounted() ? !connector.ready : false}
          key={connector.id}
          onClick={() => connect({ connector })}
          className={`${styles.connectionOption} ${(!connector.ready && isMounted()) && styles.uninstalled}`}
        >
          {String(connector.name) === "MetaMask" && <Image src="/assets/icons/metamask.png" alt="logo" width={30} height={30} className={styles.walletLogo}/>}
          {String(connector.name) === "Coinbase Wallet" && <Image src="/assets/icons/coinbase.png" alt="logo" width={30} height={30} className={styles.walletLogo}/>}
          {String(connector.name) === "WalletConnect" && <Image src="/assets/icons/walletConnect.png" alt="logo" width={30} height={30} className={styles.walletLogo}/>}
          {String(connector.name) === "Injected" && <Image src="/assets/icons/wallet.svg" alt="logo" width={30} height={30} className={styles.walletLogo}/>}
          {connector.name}
          {(!connector.ready && isMounted()) && ' (uninstalled)'}
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
  const [connectMenuOpen, setConnectMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleConnectOpen = () => {
    setConnectOpen(!connectOpen);
  };

  const toggleConnectMenuOpen = () => {
    console.log(connectMenuOpen);
    setConnectMenuOpen(!connectMenuOpen);
  };

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <nav>
      {!isConnected && connectOpen && <Overlay onClick={toggleConnectOpen} />}
      {!isConnected && connectOpen && <Profile />}
      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <p className={styles.navElement}><a href="/factory">BedrockMint</a></p>
      </div>
      <div className={styles.navbar}>
        <p className={`${styles.navbarLi} ${styles.menuIcon}`} aria-label="Toggle Menu" onClick={toggleMenuOpen}>☰</p>
        {isClient ? isConnected ?
          <>
            <div className={`${styles.navbarLi} ${styles.connectButton}`} onClick={toggleConnectMenuOpen}>
              <div className={styles.walletIcon}>
                <Image src="assets/icons/wallet.svg" alt="wallet" width={20} height={20} className={styles.walletIconImage}></Image>
              </div>
              <p className={`${styles.connectText}`}>{address ? (address?.slice(0, 6) + "..." + address?.slice(-4)) : "Error"}</p>
              <Image src="assets/icons/dropdown.svg" alt="dropdown" width={20} height={20} className={styles.dropdownIcon} />
            </div>
            <div className={`${styles.dropdown} ${connectMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              <p className={styles.dropdownOption} onClick={() => disconnect()}>Disconnect</p>
              <Link href="/mytokens">
                <p className={styles.dropdownOption}>My Tokens</p>
              </Link>
            </div>
          </>
          :
          <div className={`${styles.navbarLi} ${styles.connectButton}`} onClick={toggleConnectOpen}>
            <p className={styles.connectButtonText}>Connect</p>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButton}`}>
            <p className={styles.connectButtonText}>Loading...</p>
          </div>
        }
        <p className={`${styles.navbarLi} ${styles.factoryButton}`}><a href="/factory">BedrockMint</a></p>
        <p className={`${styles.navLeft} ${styles.navbarLi}`}>
          <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={35} height={35} />
          <a className={`${styles.active}`} href="/">Bedrock</a>
        </p>
      </div>
    </nav>
  );
};
