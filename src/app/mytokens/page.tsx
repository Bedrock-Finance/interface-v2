"use client";

import { tokenDeployerABI } from '@/ABIs/tokenDeployer';
import { useState } from "react";
import styles from "./page.module.css";
import { erc20ABI, useContractReads, useNetwork, useContractRead, useAccount } from 'wagmi';

import { useIsMounted } from "usehooks-ts";

import { chainDetails } from '../../Constants/config';
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

    const isMounted = useIsMounted();

    const { address } = useAccount()

    const { chain } = useNetwork();

    const chainId: string | number = chain ? (chain && chain.id) : 250;

    const tokenDeployerContract = {
        address: chainDetails[chainId] as `0x${string}`,
        abi: tokenDeployerABI,
    }

    const { data: contracts } = useContractRead({
        address: chainDetails[chainId] as `0x${string}`,
        abi: tokenDeployerABI,
        functionName: 'getTokensDeployedByUser',
        args: [address as `0x${string}`]
    });

    const contractRequests = contracts?.map((contract) => (
        [
            {
                address: contract,
                abi: erc20ABI,
                functionName: "name"
            },
            {
                address: contract,
                abi: erc20ABI,
                functionName: "symbol"
            },
            {
                address: contract,
                abi: erc20ABI,
                functionName: "totalSupply"
            },
            {
                address: contract,
                abi: erc20ABI,
                functionName: "decimals"
            }
        ]
    ));

    const { data: tempTokenData } = useContractReads({
        contracts: contractRequests?.flat()
    });
    function splitData(data: any) {
        console.log(data);
        const groupedData = [];
        const namedData = [];
        for (let i = 0; i < data.length; i += 4) {
            groupedData.push(data.slice(i, i + 4));
        }
        for (let i = 0; i < groupedData.length; i++) {
            namedData.push({
                name: groupedData[i][0].result,
                symbol: groupedData[i][1].result,
                supply: groupedData[i][2].result,
                decimals: groupedData[i][3].result,
            })
        }
        return namedData;
    }
    console.log(tempTokenData)


 
    return (
        <div className={styles.myTokens}>
            <div className={styles.myTokensHeading}>
                <p className={styles.heading}>My Tokens</p>
                <p className={styles.subheading}>See all the tokens you have created!</p>
            </div>
            {!isMounted() && <p className={styles.myTokensError}>Loading...</p>}
            {isMounted() && contracts && !contracts[0] && (
                <p className={styles.myTokensError}>No tokens available.</p>
            )}

            {isMounted() && contracts && contracts[0] && tempTokenData && tempTokenData[0] && (splitData(tempTokenData)).map((token, index: number) => (
                <div key={index} className={styles.token}>
                    <p className={styles.tokenName}>{token.name} ({token.symbol})</p>
                    <p>Contract Address: {contracts && contracts[index]}</p>
                    <p>Supply: {Number(token.supply) / 10**(token.decimals)}</p>
                    <p>Decimals: {token.decimals}</p>
                </div>
            ))}

        </div>
    );
}
