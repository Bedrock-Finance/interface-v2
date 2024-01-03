"use client";

import styles from "./navbar.module.css";
import { useState, useEffect, MouseEventHandler } from "react";

import Image from 'next/image'
import Link from "next/link";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork
} from 'wagmi'

import { useIsMounted } from "usehooks-ts";

import { Overlay } from "../overlay/overlay";

import { tokenDeployerDetails } from "@/Constants/config";

import { chains } from "@/Constants/config";

import { ConnectWallet } from "../connectWallet/connectWallet";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [connectOpen, setConnectOpen] = useState<boolean>(false);
  const [connectMenuOpen, setConnectMenuOpen] = useState<boolean>(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [tempNetwork, setTempNetwork] = useState<string>("Fantom");

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleConnectOpen = () => {
    setConnectOpen(!connectOpen);
  };

  const toggleConnectMenuOpen = () => {
    if (!connectMenuOpen) {
      setNetworkMenuOpen(false);
    }
    setConnectMenuOpen(!connectMenuOpen);
  };

  const toggleNetworkMenuOpen = () => {
    if (!networkMenuOpen) {
      setConnectMenuOpen(false);
    }
    setNetworkMenuOpen(!networkMenuOpen);
  };

  function dropdownAction(func: () => void): void {
    func();
    setConnectMenuOpen(false);
    setNetworkMenuOpen(false);
  }


  const { chain } = useNetwork();
  const { error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (

    <nav>
      {!isConnected && connectOpen && <Overlay onClick={toggleConnectOpen} />}
      {!isConnected && connectOpen && <ConnectWallet />}
      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
        <p className={styles.navElement}><a href="/app/factory">BedrockMint</a></p>
      </div>
      <div className={styles.navbar}>
        <p className={`${styles.navbarLi} ${styles.menuIcon}`} aria-label="Toggle Menu" onClick={toggleMenuOpen}>☰</p>
        {isClient ? isConnected ?
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`} onClick={toggleConnectMenuOpen}>
              <div className={styles.walletIcon}>
                <Image src="/assets/icons/wallet.svg" alt="wallet" width={15} height={15} className={styles.walletIconImage}></Image>
              </div>
              <p className={`${styles.connectText}`}>{address ? (address?.slice(0, 6) + "..." + address?.slice(-4)) : "Error"}</p>
              <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={20} height={20} className={styles.dropdownIcon} />
            </div>
            <div className={`${styles.dropdown} ${connectMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => disconnect())}>Disconnect</p>
              <Link href="/app/mytokens">
                <p className={styles.dropdownOption}>My Tokens</p>
              </Link>
            </div>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButton}`} onClick={toggleConnectOpen}>
            <p className={styles.connectButtonText}>Connect</p>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButton}`}>
            <p className={styles.connectButtonText}>Loading...</p>
          </div>
        }
        {isClient ? isConnected ?
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`} onClick={toggleNetworkMenuOpen}>
              <div className={styles.walletIcon}>
                <Image src="/assets/icons/wallet.svg" alt="wallet" width={15} height={15} className={styles.walletIconImage}></Image>
              </div>
              <p className={`${styles.connectText}`}>{chain ? chains.map(item => Number(item.id)).includes(chain.id) ? chain.name : "Unsupported" : "Error"}</p>
              <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={20} height={20} className={styles.dropdownIcon} />
            </div>
            <div className={`${styles.dropdown} ${networkMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => switchNetwork?.(250))}>Fantom</p>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => switchNetwork?.(137))}>Polygon</p>
            </div>
          </div>
          :
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`} onClick={toggleNetworkMenuOpen}>
              <div className={styles.walletIcon}>
                <Image src="/assets/icons/wallet.svg" alt="wallet" width={15} height={15} className={styles.walletIconImage}></Image>
              </div>
              <p className={styles.connectText}>{tempNetwork}</p>
              <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={20} height={20} className={styles.dropdownIcon} />
            </div>
            <div className={`${styles.dropdown} ${networkMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => setTempNetwork("Fantom"))}>Fantom</p>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => setTempNetwork("Polygon"))}>Polygon</p>
            </div>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`}>
            <p className={styles.connectButtonText}>Fantom</p>
          </div>
        }
        <p className={`${styles.navbarLi} ${styles.factoryButton}`}><Link href="/app/factory">BedrockMint</Link></p>
        <p className={`${styles.navLeft} ${styles.navbarLi}`}>
          <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={24} height={24} />
          <a className={`${styles.active}`} href="/">Bedrock</a>
        </p>
      </div>
    </nav>
  );
};
