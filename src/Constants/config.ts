"use client";

import { fantom } from 'wagmi/chains';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
 
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantom],
  [publicProvider()],
)
 
// Set up wagmi config
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Bedrock Finance',
        appLogoUrl: "https://bedrockfi.org/assets/bedrock.png"
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

export const contractAddress = "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE";
export const chainDetails: { [key: string]: string } =  { "250" : contractAddress }
export const RPC = "https://rpc.ftm.tools";
export const chainID = 250;