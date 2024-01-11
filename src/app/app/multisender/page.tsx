"use client"

import styles from "./page.module.css";

import { useState, ChangeEvent, useEffect } from "react";

import { useDebounce } from "usehooks-ts";

import { isAddress } from 'web3-validator';

import { Decimal } from 'decimal.js';

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useNetwork,
    useAccount,
    useContractRead,
    useContractReads,
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
    const [isToken, setIsToken] = useState(false);
    const dValues = useDebounce(values, 500);
    const dAddresses = useDebounce(addresses, 500);
    const dAddress = useDebounce(address, 500);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

        const decimals = tokenData ? tokenData[0].result ? tokenData[0].result : 18 : 18;
        if (isValidFormat) {
            parsedValues.map(array => {
                addresses.push(array[0].startsWith('0x') ? array[0] : `0x${array[0]}`);
                let value = new Decimal(Number(array[1]));
                console.log(value.toString());
                console.log(value.times(10**decimals));
                values.push(BigInt(value.times(10**decimals).toString()));
            });
            console.log("a")
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

    const { data: tokenData } = useContractReads({
        contracts: [{
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "decimals"
        },
        {
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: "symbol"
        }],
        enabled: isToken
    });

    const { data: allowance } = useContractRead({
        address: address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [userAddress ? userAddress : "0x0000000000000000000000000000000000000000", (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] : multisendDetails["250"] : multisendDetails["250"]) as `0x${string}`],
        enabled: isToken,
        watch: true,
    });

    const { config, isLoading, isError, error } = usePrepareContractWrite({
        address: address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'approve',
        args: [(chainId ? multisendDetails[chainId] ? multisendDetails[chainId] : multisendDetails["250"] : multisendDetails["250"]) as `0x${string}`, values.reduce((acc, curr) => acc + curr, BigInt(0))],
        cacheTime: 0,
        enabled: isToken,
        staleTime: 0,
    });

    const { config: configEther, isError: isPrepareErrorEther, isLoading: isLoadingEther, error: errorEther } = usePrepareContractWrite({
        address: (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: multisenderABI,
        functionName: 'multisendEther',
        args: [dAddresses, dValues],
        value: values.reduce((acc, curr) => acc + curr, BigInt(0)),
        cacheTime: 0,
        enabled: !isToken
    });

    const { config: configToken, isError: isPrepareErrorToken, isLoading: isLoadingToken, error: errorToken } = usePrepareContractWrite({
        address: (chainId ? multisendDetails[chainId] ? multisendDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: multisenderABI,
        functionName: 'multisendToken',
        args: [dAddress as `0x${string}`, dAddresses, dValues],
        value: BigInt(0),
        cacheTime: 0,
        enabled: isToken && (Number(allowance) >= values.reduce((acc, curr) => acc + Number(curr), Number(0))),
        staleTime: 0,
    });

    const isPrepareError = isToken ? isPrepareErrorToken : isPrepareErrorEther;
    const isLoadingPrepare = isToken ? isLoadingToken : isLoadingEther;
    const prepareError = isToken ? errorToken : errorEther;

    const { data, write, isLoading: isLoadingWrite } = useContractWrite(isToken ? configToken : configEther);
    const { data: approveData, write: writeApprove, isLoading: isLoadingWriteApprove } = useContractWrite(config);

    const { isLoading: isLoadingTransaction, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    const { isLoading: isLoadingTransactionApprove, isSuccess: isSuccessApprove, data: approveTransactionData } = useWaitForTransaction({
        hash: approveData?.hash,
    });

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };


    return (
        <div>
            {isClient && (chainId && !multisendDetails[chainId]) && <ChangeNetwork changeNetworkToChainId={250} dappName={"Multisender"} networks={"Fantom and Fantom Testnet"}/>}
            <div className={styles.tokenDeployer}>
                <p className={styles.title}>Multisender</p>
                <p className={styles.inputDescription}>by Bedrock Finance</p>
                <button className={`${styles.typeInput} ${!isToken && styles.selected}`} onClick={() => setIsToken(false)}>Coin</button>
                <button className={`${styles.typeInput} ${isToken && styles.selected}`} onClick={() => setIsToken(true)}>Token</button>
                {isToken &&
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
                }
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>{isToken ? (tokenData && tokenData[1].result) : "Coin"} Allocations*</p>
                    <textarea
                        onChange={setTokenMultisendValues}
                        className={`${styles.tokenInput}`}
                        placeholder={'Seperate each group with a line break (enter) and each address and value with a comma (",")\nEx:\n0x0000000000000000000000000000000000000001, 1\n0x0000000000000000000000000000000000000002, 5.7'}
                    />
                    <p className={styles.inputDescription}>Example: 0x12345</p>
                    {!isValid && (
                        <p className={styles.error}>Invalid values</p>
                    )}
                    {isToken && (!allowance ? true : (values.reduce((acc, curr) => acc + Number(curr), Number(0)) === 0 ? true : (Number(allowance) < values.reduce((acc, curr) => acc + Number(curr), Number(0))))) &&
                        (<button
                            onClick={() => writeApprove?.()}
                            className={`${styles.deployButton} ${isClient && !isError && !isLoading && isConnected && isValid && !(isLoadingTransactionApprove || isLoadingWriteApprove) ? "" : styles.disabled}`}
                            disabled={isClient && !(Number.isNaN(Number(allowance))) && !isLoading && isConnected && isValid && !(isLoadingTransactionApprove || isLoadingWriteApprove) ? false : true}
                        >
                            {isClient ? 
                            isConnected ? 
                            !Number.isNaN(Number(allowance)) ? 
                            (isLoadingTransactionApprove || isLoadingWriteApprove) ? 
                            'Approving...' 
                            : "Approve" + " " + (String((tokenData ? tokenData[1].result : "")) && String((tokenData ? tokenData[1].result : "")))
                            : "Could Not Fetch Token Data" 
                            : "Not Connected" 
                            : "Loading..."}
                        </button>)
                    }
                    {(!isToken ? true : !isConnected ? true : Number(allowance) >= values.reduce((acc, curr) => acc + Number(curr), Number(0))) &&
                        <button
                            onClick={() => write?.()}
                            className={`${styles.deployButton} ${isClient && !isPrepareError && !isLoadingPrepare && isConnected && isValid && !(isLoadingTransaction || isLoadingWrite) ? "" : styles.disabled}`}
                            disabled={isClient && !isPrepareError && !isLoadingPrepare && isConnected && isValid && !(isLoadingTransaction || isLoadingWrite) ? false : true}
                        >
                            {isClient ? isConnected ? (isLoadingTransaction || isLoadingWrite) ? 'Sending...' : "Send Transaction" : "Not Connected" : "Loading..."}
                        </button>
                    }
                    <p className={styles.inputDescription}>(*) is a required field</p>
                </div>
                {isClient && isConnected && (Number(allowance) < values.reduce((acc, curr) => acc + Number(curr), Number(0))) && isToken &&
                    <div className={styles.errorSection}>
                        {(isError) ?
                            <div onClick={toggleErrorMenuOpen} className={styles.errorCollapsed}>
                                <p className={styles.errorHeader}>❌ Contract Execution Error</p>
                                <Image src="/assets/icons/dropdown.svg" alt="dropdown" width={25} height={25} className={styles.errorDropdown} />
                            </div>
                            :
                            <div className={styles.errorCollapsed}>
                                {!isLoading ?
                                    <p className={styles.errorHeader}>✅ All Clear</p>
                                    :
                                    <p className={styles.errorHeader}>⏳ Loading</p>
                                }
                            </div>
                        }
                        {(errorMenu && isError) && (
                            !isLoading ?
                                <p className={styles.errorText}>{error?.cause ? capitalizeFirstLetter(error?.cause + ".") : (error?.message.includes("v1: Invalid Decimals") ? "v1: Invalid Decimals" : capitalizeFirstLetter((error?.message) + "."))}</p>
                                :
                                <p className={styles.errorText}>Loading...</p>
                        )
                        }
                    </div>
                }
                {isClient && isConnected && (!isToken ? true : (Number(allowance) >= values.reduce((acc, curr) => acc + Number(curr), Number(0)))) &&
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
                                <p className={styles.errorText}>{prepareError?.cause ? capitalizeFirstLetter(prepareError?.cause + ".") : (prepareError?.message.includes("v1: Invalid Decimals") ? "v1: Invalid Decimals" : capitalizeFirstLetter((prepareError?.message) + "."))}</p>
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