import styles from "./changeNetwork.module.css";
import { Overlay } from "../overlay/overlay";

import { useSwitchNetwork } from 'wagmi'

import { FC } from 'react'; // Import FC type from React

// Define the props interface for ChangeNetwork component
interface ChangeNetworkProps {
  changeNetworkToChainId: number;
}

export const ChangeNetwork: FC<ChangeNetworkProps> = ({ changeNetworkToChainId }) => {
    const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

    return (
        <>
            <Overlay onClick={undefined} />
            <div className={styles.changeNetwork}>
                <p className={styles.changeNetworkHeader}>Unsupported Network!</p>
                <p>BedrockMint v1 only supports Fantom and Polygon</p>
                <p className={styles.switchNetwork} onClick={() => switchNetwork?.(changeNetworkToChainId)}>Switch Network in Wallet</p>
                <p>{error && error.message}</p>
            </div>
        </>
    )
}