"use client";

import { useState, ChangeEvent, useEffect } from "react";

import styles from "./page.module.css";

import { tokenDeployerABI } from "@/ABIs/tokenDeployer";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { tokenDeployerDetails } from "@/Constants/config";

import Image from "next/image";

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useNetwork,
    useAccount,
    useContractRead
} from 'wagmi';

import { ChangeNetwork } from "@/Components/changeNetwork/changeNetwork";

import { useDebounce } from "usehooks-ts";

import { capitalizeFirstLetter } from "../../../Utils/capitilizeFirstLetter";



export default function Factory(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [supply, setSupply] = useState<string>("");
    const [decimals, setDecimals] = useState<string>("");
    const dName = useDebounce(name, 500);
    const dSymbol = useDebounce(symbol, 500);
    const dSupply = useDebounce(supply, 500);
    const dDecimals = useDebounce(decimals, 500);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const [errorMenu, setErrorMenu] = useState(false);

    const { isConnected } = useAccount();

    const setTokenName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const setTokenSymbol = (e: ChangeEvent<HTMLInputElement>) => {
        setSymbol(e.target.value);
    };

    const setTokenSupply = (e: ChangeEvent<HTMLInputElement>) => {
        setSupply(e.target.value);
    };

    const setTokenDecimals = (e: ChangeEvent<HTMLInputElement>) => {
        setDecimals(e.target.value);
    };

    const isFormFilled = (): boolean => {
        return name.trim().length > 0 && symbol.trim().length > 0 && supply.trim().length > 0;
    };

    const { chain } = useNetwork();

    const chainId: string | number = chain ? (chain && chain.id) : 250;

    const { data: deployFee } = useContractRead({
        address: tokenDeployerDetails[chainId] as `0x${string}`,
        abi: tokenDeployerABI,
        functionName: 'creationFee',
    });

    const { config,
        error: prepareError,
        isError: isPrepareError,
        isLoading: isLoadingPrepare
    }: {
        config: any;
        error: any;
        isError: any;
        isLoading: any;
    } = usePrepareContractWrite({
        address: (chainId ? tokenDeployerDetails[chainId] ? tokenDeployerDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: tokenDeployerABI,
        functionName: 'deployToken',
        args: [dSymbol, dName, dDecimals ? Number(dDecimals) : 18, BigInt(dSupply)],
        value: deployFee,
        cacheTime: 0
    })

    const { data, isLoading: isLoadingWrite, isSuccess: isSuccessWrite, write, error, isError }:
        {
            data: any
            isLoading: any
            isSuccess: any
            write: any
            error: any
            isError: any
        } = useContractWrite(config);

    const { data: useWaitData, isLoading: isLoadingTransaction, isSuccess: isSuccessTransaction, error: error_ } = useWaitForTransaction({
        hash: data?.hash,
    });

    const toggleErrorMenuOpen = () => {
        setErrorMenu(!errorMenu);
    }

    return (
        <div>
            {isClient && (chainId && !tokenDeployerDetails[chainId]) && <ChangeNetwork changeNetworkToChainId={250} dappName={"BedrockMint"} networks={"Fantom, Fantom Sonic Testnet, and Polygon"} />}
            <div className={styles.tokenDeployer}>
                <p className={styles.title}>BedrockMint v1</p>
                <p className={styles.inputDescription}>by Bedrock Finance</p>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Name*</p>
                    <input
                        onChange={setTokenName}
                        className={`${styles.tokenInput}`}
                        placeholder="Your Token Name"
                        value={name}
                    />
                    <p className={styles.inputDescription}>Example: Bitcoin</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Symbol*</p>
                    <input
                        onChange={setTokenSymbol}
                        className={`${styles.tokenInput}`}
                        placeholder="Your Token Symbol"
                        value={symbol}
                    />
                    <p className={styles.inputDescription}>Example: BTC</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Supply*</p>
                    <input
                        onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
                        onChange={setTokenSupply}
                        className={`${styles.tokenInput}`}
                        placeholder="Your Token Supply"
                        type="number"
                        value={supply}
                    />
                    <p className={styles.inputDescription}>Example: 21000000</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Decimals</p>
                    <input
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        onChange={setTokenDecimals}
                        className={`${styles.tokenInput}`}
                        placeholder="Your Token Decimals"
                        type="number"
                        value={decimals}
                    />
                    {!(Number(decimals) >= 0 && Number(decimals) <= 18) && (
                        <p className={styles.error}>Decimals must be from 0 to 18</p>
                    )}
                    <p className={styles.inputDescription}>Example: 8</p>
                </div>
                <button
                    onClick={() => write?.()}
                    className={`${styles.deployButton} ${!isPrepareError && isConnected && isFormFilled() && Number(decimals) >= 0 && Number(decimals) <= 18 && Number(supply) >= 0 && !(isLoadingTransaction || isLoadingWrite) ? "" : styles.disabled}`}
                    disabled={!isPrepareError && isConnected && isFormFilled() && Number(decimals) >= 0 && Number(decimals) <= 18 && Number(supply) >= 0 && !(isLoadingTransaction || isLoadingWrite) ? false : true}
                >
                    {isClient ? isConnected ? (isLoadingTransaction || isLoadingWrite) ? 'Minting...' : ("Deploy (" + String(deployFee && Number(deployFee) * 10 ** (-18)) + " " + String(chain ? (chain && chain.nativeCurrency.symbol) : "FTM")) + ")" : "Not Connected" : "Loading..."}
                </button>
                <p className={styles.inputDescription}>(*) is a required field</p>
                {isSuccessTransaction &&
                    toast("Token successfully deployed! Go to My Tokens to check it out!", {
                        toastId: String(useWaitData),
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })}
                {isClient && isConnected &&
                    <div className={styles.errorSection}>
                        {(isPrepareError) ?
                            <div onClick={toggleErrorMenuOpen} className={styles.errorCollapsed}>
                                <p className={styles.errorHeader}>❌ Contract Execution Error</p>
                                <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={25} height={25} className={styles.errorDropdown} />
                            </div>
                            :
                            <div className={styles.errorCollapsed}>
                                {!isLoadingPrepare ?
                                    <p className={styles.errorHeader}>✅ All Clear</p>
                                    :
                                    <p className={styles.errorHeader}>⏳ Loading</p>
                                }
                            </div>
                        }
                        {(errorMenu && isPrepareError) && (
                            !isLoadingPrepare ?
                                <p className={styles.errorText}>{prepareError?.details ? capitalizeFirstLetter(prepareError?.details + ".") : (prepareError?.message.includes("v1: Invalid Decimals") ? "v1: Invalid Decimals" : capitalizeFirstLetter((prepareError?.message) + "."))}</p>
                                :
                                <p className={styles.errorText}>Loading...</p>
                        )
                        }
                    </div>
                }
            </div>
        </div>

    );
};