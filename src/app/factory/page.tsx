"use client";

import { useState, useEffect, ChangeEvent } from "react";

import styles from "./page.module.css";

import { tokenDeployerABI } from "@/ABIs/tokenDeployer";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAccount } from "wagmi";

import { chainDetails } from "@/Constants/config";

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useNetwork
} from 'wagmi'

import { useDebounce } from 'usehooks-ts'

import { ChangeNetwork } from "@/Components/changeNetwork/changeNetwork";
import { write } from "fs";

import { useIsMounted } from "usehooks-ts";

export default function Factory(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [supply, setSupply] = useState<string>("");
    const [decimals, setDecimals] = useState<string>("");
    const dName = useDebounce(name, 500);
    const dSymbol = useDebounce(symbol, 500);
    const dSupply = useDebounce(supply, 500);
    const dDecimals = useDebounce(decimals, 500);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isMounted = useIsMounted();

    const { isConnected } = useAccount();

    const [deployFee, setDeployFee] = useState<number>(5);

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

    const shouldDisplayError = (value: string): boolean => {
        return value.trim().length > 0;
    };

    const determineInputClass = (value: string): string => {
        return value.trim().length > 0 ? (isValidInput(value) ? "valid" : "invalid") : "neutral";
    };

    const isValidInput = (value: string): boolean => {
        return value.trim().length > 0;
    };

    const determineSupplyInputClass = (value: string): string => {
        return value.trim().length > 0 ? (Number(value) > 0 ? "valid" : "invalid") : "neutral";
    };

    const determineDecimalsInputClass = (value: string): string => {
        return value.trim().length > 0 ? (Number(value) >= 0 && Number(value) <= 18 ? "valid" : "invalid") : "neutral";
    };

    const { chain } = useNetwork();

    const chainId: string | number | undefined = chain && chain.id;

    const { config } = usePrepareContractWrite({
        address: (chainId ? chainDetails[chainId] ? chainDetails[chainId] as `0x${string}` : undefined : undefined),
        abi: tokenDeployerABI,
        functionName: 'deployToken',
        args: [dSymbol, dName, dDecimals ? Number(dDecimals) : 18, BigInt(dSupply)],
        value: BigInt((deployFee * (10 ** 18)))
    })

    const { data, isLoading: isLoadingWrite, isSuccess: isSuccessWrite, write: _write } = useContractWrite(config);

    const { isLoading: isLoadingTransaction, isSuccess: isSuccessTransaction } = useWaitForTransaction({
        hash: data?.hash,
    })

    const write = async () => {
        setIsLoading(true);
        await (_write && _write())
        setIsLoading(false);
    }

    return (
        <div>
            {isMounted() && chain && chain.id !== 250 && <ChangeNetwork />}
            <div className={styles.tokenDeployer}>
                <p className={styles.title}>BedrockMint v1</p>
                <p className={styles.inputDescription}>by Bedrock Finance</p>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Name*</p>
                    <input
                        onChange={setTokenName}
                        className={`${styles.tokenInput} ${determineInputClass(name)}`}
                        placeholder="Your Token Name"
                        value={name}
                    />
                    {shouldDisplayError(name) && !isValidInput(name) && (
                        <p className={styles.error}>Name is a required field!</p>
                    )}
                    <p className={styles.inputDescription}>Example: Bitcoin</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Symbol*</p>
                    <input
                        onChange={setTokenSymbol}
                        className={`${styles.tokenInput} ${determineInputClass(symbol)}`}
                        placeholder="Your Token Symbol"
                        value={symbol}
                    />
                    {shouldDisplayError(symbol) && !isValidInput(symbol) && (
                        <p className={styles.error}>Symbol is a required field!</p>
                    )}
                    <p className={styles.inputDescription}>Example: BTC</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Token Supply*</p>
                    <input
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        onChange={setTokenSupply}
                        className={`${styles.tokenInput} ${determineSupplyInputClass(supply)}`}
                        placeholder="Your Token Supply"
                        type="number"
                        value={supply}
                    />
                    {shouldDisplayError(supply) && (!isValidInput(supply) || Number(supply) <= 0) && (
                        <p className={styles.error}>Please enter a valid token supply</p>
                    )}
                    <p className={styles.inputDescription}>Example: 21000000</p>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.inputTitle}>Decimals</p>
                    <input
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        onChange={setTokenDecimals}
                        className={`${styles.tokenInput} ${determineDecimalsInputClass(String(decimals))}`}
                        placeholder="Your Token Decimals"
                        type="number"
                        value={decimals}
                    />
                    {shouldDisplayError(String(decimals)) && !(Number(decimals) >= 0 && Number(decimals) <= 18) && (
                        <p className={styles.error}>Decimals must be from 0 to 18</p>
                    )}
                    <p className={styles.inputDescription}>Example: 8</p>
                </div>
                <button
                    onClick={() => write?.()}
                    className={`${styles.deployButton} ${isFormFilled() && Number(decimals) >= 0 && Number(decimals) <= 18 && Number(supply) >= 0 && !(isLoadingTransaction || isLoadingWrite) ? "" : styles.disabled}`}
                    disabled={isConnected && isFormFilled() && Number(decimals) >= 0 && Number(decimals) <= 18 && Number(supply) >= 0 && !(isLoadingTransaction || isLoadingWrite) ? false : true}
                >
                    {isMounted() ? isConnected ? (isLoadingTransaction || isLoadingWrite) ? 'Minting...' : "Deploy (" + deployFee + " FTM)" : "Not Connected" : "Loading..."}
                </button>
                <p className={styles.inputDescription}>(*) is a required field</p>
            </div>
        </div>

    );
};