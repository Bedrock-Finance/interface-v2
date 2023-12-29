import styles from "./changeNetwork.module.css";
import { Overlay } from "../overlay/overlay";

import { useSwitchNetwork } from 'wagmi'

export const ChangeNetwork = () => {
    const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

    return (
        <>
            <Overlay onClick={undefined} />
            <div className={styles.changeNetwork}>
                <p className={styles.changeNetworkHeader}>Unsupported Network!</p>
                <p>BedrockMint v1 only supports Fantom and Polygon</p>
                <p className={styles.switchNetwork} onClick={() => switchNetwork?.(250)}>Switch Network in Wallet</p>
                <p>{error && error.message}</p>
            </div>
        </>
    )
}