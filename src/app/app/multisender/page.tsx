"use client"

import styles from "./page.module.css";

import { useState, ChangeEvent } from "react";

import { useIsMounted, useDebounce } from "usehooks-ts";

import { isAddress } from 'web3-validator';

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useNetwork,
    useAccount,
    useContractRead,
    erc20ABI
} from 'wagmi';

import { multisendDetails } from "@/Constants/config";

import { ChangeNetwork } from "@/Components/changeNetwork/changeNetwork";

import { capitalizeFirstLetter } from "@/Utils/capitilizeFirstLetter";

import Image from "next/image";

import { multisenderABI } from "@/ABIs/multisender";

export default function Multisender(): JSX.Element {
    const [address, setAddress] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [addresses, setAddresses] = useState<`0x${string}`[]>([]);
    const [values, setValues] = useState<bigint[]>([]);
    const [errorMenu, setErrorMenu] = useState(false);
    const dValues = useDebounce(values, 500);
    const dAddresses = useDebounce(addresses, 500);
    const dAddress = useDebounce(address, 500);

    const isMounted = useIsMounted();

    const toggleErrorMenuOpen = () => {
        setErrorMenu(!errorMenu);
    }

    const { isConnected, address: userAddress } = useAccount();

    const { chain } = useNetwork();

    const chainId: string | number = chain ? (chain && chain.id) : 250;

    const setTokenAddress = (e: ChangeEvent<HTMLInputElement>) => {
        const inputAddress = e.target.value;
        const formattedAddress = inputAddress.startsWith('0x') ? inputAddress : `0x${inputAddress}`;
        setAddress(formattedAddress);
    };

    const setTokenMultisendValues = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const addresses: string[] = [];
        const values: bigint[] = [];
        const parsedValues = (e.target.value.split("\n").map(line => line.split(",")))
            .filter((array) => { return (array.length === 2) });
            console.log(parsedValues);
        const isValidFormat = parsedValues.every(array => {
            if (array.length !== 2) {
                return false;
            }
            const isAddressValid = isAddress(array[0]);
            const isSecondValueNumber = array[1] && Number(array[1]) >= 0 && isFinite(Number(array[1]));

            return isAddressValid && isSecondValueNumber;
        });

        if (isValidFormat) {
            parsedValues.map(array => {
                addresses.push(array[0].startsWith('0x') ? array[0] : `0x${array[0]}`);
                values.push(BigInt(Math.floor(Number(array[1]) * (10 ** (decimals ? decimals : 18)))));
            });
    
            console.log(addresses);
            console.log(values);
            console.log(decimals);
    
            setIsValid(true);
            setValues(values);
            setAddresses(addresses as `0x${string}`[]);
        } else {
            setIsValid(false);
        }
    };

    const { data: decimals } = useContractRead({
        address: address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'decimals',
        enabled: address.trim().length > 0 && address !== "0x"
    });

    const { data: allowance } = useContractRead({
        address: address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [userAddress ? userAddress : "0x0000000000000000000000000000000000000000", (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] : multisendDetails["250"] : multisendDetails["250"]) as `0x${string}`],
        enabled: address.trim().length > 0 && address !== "0x"
    });

    const { config } = usePrepareContractWrite({
        address: address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [(chainId ? multisendDetails[chainId] ? multisendDetails[chainId] : multisendDetails["250"] : multisendDetails["250"]) as `0x${string}`, values.reduce((acc, curr) => acc + curr, BigInt(0))],
        cacheTime: 0,
        enabled: address.trim().length > 0 && address !== "0x",
    });

    const { config: configEther, isError: isPrepareErrorEther, isLoading: isLoadingEther, error: errorEther } = usePrepareContractWrite({
        address: (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: multisenderABI,
        functionName: 'multisendEther',
        args: [dAddresses, dValues],
        value: values.reduce((acc, curr) => acc + curr, BigInt(0)),
        cacheTime: 0,
        enabled: !(address.trim().length > 0 && address !== "0x")
    });

    const { config: configToken, isError: isPrepareErrorToken, isLoading: isLoadingToken, error: errorToken } = usePrepareContractWrite({
        address: (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: multisenderABI,
        functionName: 'multisendToken',
        args: [dAddress as `0x${string}`, dAddresses, dValues],
        value: BigInt(0),
        cacheTime: 0,
        enabled: address.trim().length > 0 && address !== "0x"
    });

    const isPrepareError = address ? isPrepareErrorToken : isPrepareErrorEther;
    const isLoadingPrepare = address ? isLoadingToken : isLoadingEther;
    const prepareError = address ? errorToken : errorEther;

    const { data, write, isLoading: isLoadingWrite } = useContractWrite(address ? configToken : configEther);

    const { isLoading: isLoadingTransaction, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })


    return (
        <div>
            {isMounted() && (chainId && !multisendDetails[chainId]) && <ChangeNetwork changeNetworkToChainId={4002} />}
            <div className={styles.tokenDeployer}>
                <p className={styles.title}>Multisender (WARNING: IN TESTING)</p>
                <p className={styles.inputDescription}>by Bedrock Finance</p>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Address*</p>
                    <input
                        onChange={setTokenAddress}
                        className={`${styles.tokenInput}`}
                        placeholder="Contract Address"
                    />
                    <p className={styles.inputDescription}>Example: 0x12345</p>
                    {!isAddress(address) && address.trim().length > 0 && address !== "0x" && (
                        <p className={styles.error}>Invalid address</p>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Allocations*</p>
                    <textarea
                        onChange={setTokenMultisendValues}
                        className={`${styles.tokenInput}`}
                        placeholder={'Seperate each group with a line break (enter) and each address and value with a comma (",")\nEx:\n0x0000000000000000000000000000000000000001, 1\n0x0000000000000000000000000000000000000002, 5.7'}
                    />
                    <p className={styles.inputDescription}>Example: 0x12345</p>
                    {!isValid && (
                        <p className={styles.error}>Invalid values</p>
                    )}
                    <button
                        onClick={() => write?.()}
                        className={`${styles.deployButton} ${isMounted() && !isPrepareError && !isLoadingPrepare && isConnected && isValid && !(isLoadingTransaction || isLoadingWrite) ? "" : styles.disabled}`}
                        disabled={isMounted() && !isPrepareError && !isLoadingPrepare && isConnected && isValid && !(isLoadingTransaction || isLoadingWrite) ? false : true}
                    >
                        {isMounted() ? isConnected ? (isLoadingTransaction || isLoadingWrite) ? 'Sending...' : "Send" : "Not Connected" : "Loading..."}
                    </button>
                </div>
                {isMounted() && isConnected &&
                    <div className={styles.errorSection}>
                        {(isPrepareError) ?
                            <div onClick={toggleErrorMenuOpen} className={styles.errorCollapsed}>
                                <p className={styles.errorHeader}>❌ Contract Execution Error</p>
                                <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={25} height={25} className={styles.errorDropdown} />
                            </div>
                            :
                            <div className={styles.errorCollapsed}>
                                { !isLoadingPrepare ?
                                <p className={styles.errorHeader}>✅ All Clear</p> 
                                :
                                <p className={styles.errorHeader}>⏳ Loading</p>
                                }
                            </div>
                        }
                        {(errorMenu && isPrepareError) && (
                            !isLoadingPrepare ?
                            <p className={styles.errorText}>{prepareError?.cause ? capitalizeFirstLetter(prepareError?.cause+ ".") : (prepareError?.message.includes("v1: Invalid Decimals") ? "v1: Invalid Decimals" : capitalizeFirstLetter((prepareError?.message) + "."))}</p> 
                            :
                             <p className={styles.errorText}>Loading...</p>
                        )
                        }
                    </div>
                }
            </div>
        </div>
    )    
}