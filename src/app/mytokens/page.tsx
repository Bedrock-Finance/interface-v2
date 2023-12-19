"use client";

import { tokenDeployerABI } from '@/ABIs/tokenDeployer';
import { RPC } from '../../Constants/config';
import { contractAddress } from "../../Constants/config";
import { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "./page.module.css";
import { erc20ABI } from 'wagmi';

interface Token {
    contractAddress: string;
    name: string;
    symbol: string;
    supply: number;
    decimals: number;
}

export default function MyTokens(): JSX.Element {
    const [tokenData, setTokenData] = useState<Token[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    function handleChainChanged(): void {
        window.location.reload();
    }

    useEffect(() => {
        const init = async (): Promise<void> => {
            try {
                const web3 = new Web3(RPC);
                const tokenDeployer = await new web3.eth.Contract(tokenDeployerABI, contractAddress);
                if (typeof window.ethereum !== 'undefined') {
                    window.ethereum.on('chainChanged', handleChainChanged);
                }

                if (typeof window.ethereum !== 'undefined') {
                    const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts && accounts.length > 0) {
                        const data: string[] = await tokenDeployer.methods.getTokensDeployedByUser(accounts[0]).call();
                        const tokens: Token[] = [];
                        for (let contracts = 0; contracts < data.length; contracts++) {
                            const token = await new web3.eth.Contract(erc20ABI, data[contracts]);
                            const tokenName: string = await token.methods.name().call();
                            const tokenSymbol: string = await token.methods.symbol().call();
                            const totalSupply = await token.methods.totalSupply().call();
                            const tokenDecimals = await token.methods.decimals().call();

                            tokens.push({
                                contractAddress: data[contracts],
                                name: tokenName,
                                symbol: tokenSymbol,
                                supply: Number(totalSupply) * (10 ** -Number(tokenDecimals)),
                                decimals: Number(tokenDecimals)
                            });
                        }
                        setTokenData(tokens);
                    } else {
                        // Metamask is not connected
                        setLoading(false);
                    }
                } else {
                    // Wallet is not installed
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching token data:", error);
                setLoading(false);
            } finally {
                setLoading(false); // Set loading to false in case of any error
            }
        };
        init();
    }, []);

    return (
            <div className={styles.myTokens}>
                <div className={styles.myTokensHeading}>
                    <p className={styles.heading}>My Tokens</p>
                    <p className={styles.subheading}>See all the tokens you have created!</p>
                </div>
        
                {loading && <p className={styles.myTokensError}>Loading...</p>}
        
                {!loading && tokenData.length === 0 && (
                    <p className={styles.myTokensError}>No tokens available.</p>
                )}
        
                {tokenData.map((token: Token, index: number) => (
                    <div key={index} className={styles.token}>
                        <p className={styles.tokenName}>{token.name} ({token.symbol})</p>
                        <p>Contract Address: {token.contractAddress}</p>
                        <p>Supply: {token.supply}</p>
                        <p>Decimals: {token.decimals}</p>
                    </div>
                ))}
            </div>
    );
}
