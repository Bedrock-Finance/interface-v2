import styles from "./connectWallet.module.css";

import { useIsMounted } from "usehooks-ts";

import { useConnect } from "wagmi";

import Image from "next/image";

export function ConnectWallet() {
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
            {String(connector.name) === "MetaMask" && <Image src="/assets/icons/metamask.png" alt="logo" width={30} height={30} className={styles.walletLogo} />}
            {String(connector.name) === "Coinbase Wallet" && <Image src="/assets/icons/coinbase.png" alt="logo" width={30} height={30} className={styles.walletLogo} />}
            {String(connector.name) === "WalletConnect" && <Image src="/assets/icons/walletConnect.png" alt="logo" width={30} height={30} className={styles.walletLogo} />}
            {String(connector.name) === "Injected" && <Image src="/assets/icons/wallet.svg" alt="logo" width={30} height={30} className={styles.walletLogo} />}
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
  