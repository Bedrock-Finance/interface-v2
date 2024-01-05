"use client";

import { tokenDeployerABI } from '@/ABIs/tokenDeployer';
import styles from "./page.module.css";
import { erc20ABI, useContractReads, useNetwork, useContractRead, useAccount } from 'wagmi';

import { useIsMounted } from "usehooks-ts";
import { ChangeNetwork } from '@/Components/changeNetwork/changeNetwork';
import { tokenDeployerDetails } from '../../../Constants/config';
import { useState, useEffect } from 'react';

export default function MyTokens(): JSX.Element {

    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, []);

    const { address } = useAccount()
    const { chain } = useNetwork();

    const chainId: string | number = chain ? (chain && chain.id) : 250;

    const { data: contracts } = useContractRead({
        address: tokenDeployerDetails[chainId] as `0x${string}`,
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
 
    return (
        <div>
            {isClient && (chainId && !tokenDeployerDetails[chainId]) && <ChangeNetwork changeNetworkToChainId={250}/>}
            <div className={styles.myTokensHeading}>
                <p className={styles.heading}>My Tokens</p>
                <p className={styles.subheading}>See all the tokens you have created!</p>
            </div>
            {!isClient && <p className={styles.myTokensError}>Fetching data from blockchain...</p>}
            {isClient && contracts && !contracts[0] && (
                <p className={styles.myTokensError}>No tokens available.</p>
            )}
            {isClient && contracts && contracts[0] && tempTokenData && tempTokenData[0] && (splitData(tempTokenData)).map((token, index: number) => (
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
