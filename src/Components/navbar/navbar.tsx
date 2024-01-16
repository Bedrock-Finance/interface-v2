"use client";

import styles from "./navbar.module.css";
import { useState, useEffect, useContext } from "react";

import Image from 'next/image'
import Link from "next/link";

import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchNetwork
} from 'wagmi'

import { useIsMounted } from "usehooks-ts";

import { Overlay } from "../overlay/overlay";

import { tokenDeployerDetails } from "@/Constants/config";

import { chains } from "@/Constants/config";

import { ConnectWallet } from "../changeNetwork/connectWallet/connectWallet";

export function Navbar(
  { isApp, onOpenChange }: { isApp: boolean, onOpenChange: ((newInfo: boolean) => void) | undefined }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [connectOpen, setConnectOpen] = useState<boolean>(false);
  const [connectMenuOpen, setConnectMenuOpen] = useState<boolean>(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [tempNetwork, setTempNetwork] = useState<string>("Fantom");
  const [isVerticalNavOpen, setIsVerticalNavOpen] = useState<boolean>(false);

  const updateNavOpen = () => {
    setIsVerticalNavOpen(!isVerticalNavOpen);
    onOpenChange?.(!isVerticalNavOpen);
  };

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
      <div className={styles.navbar}>
        {isApp && (isClient ? isConnected ?
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
        )}
        {isApp && (isClient ? isConnected ?
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
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => switchNetwork?.(4002))}>Fantom Testnet</p>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => switchNetwork?.(64165))}>Fantom Sonic</p>
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
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => setTempNetwork("Fantom Testnet"))}>Fantom Testnet</p>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => setTempNetwork("Fantom Sonic"))}>Fantom Sonic</p>
            </div>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`}>
            <p className={styles.connectButtonText}>Fantom</p>
          </div>
        )}
        {isApp &&
          <p onClick={updateNavOpen} className={`${styles.navLeft} ${styles.navbarLi} ${styles.active}`}>☰</p>
        }
        {!isApp &&
          <Link href="/app/factory">
            <div className={`${styles.navbarLi} ${styles.connectButton}`}>
              <p className={styles.connectButtonText}>Launch App</p>
            </div>
          </Link>
        }
        {!isApp &&
          <Link href="/blog">
            <p className={`${styles.navbarLi} ${styles.active}`}>
              Blog
            </p>
          </Link>
        }
        <Link href="/">
          <p className={`${styles.navLeft} ${styles.navbarLi} ${styles.active}`}>
            <Image alt="logo" src="/assets/bedrock.png" className={styles.navLogo} width={24} height={24} />
            Bedrock
          </p>
        </Link>
      </div>
    </nav>
  );
};
