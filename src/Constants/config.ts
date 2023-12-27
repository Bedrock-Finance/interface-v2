"use client";

import { fantom, polygon } from 'wagmi/chains';
import { createConfig, configureChains } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantom, polygon],
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
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'b54921a5e6a4255b4a9b0bc40174159f',
        metadata: {
          name: 'Bedrock Finance',
          description: 'Best Launchpad Protocol',
          url: 'https://bedrockfi.org',
          icons: ['https://bedrockfi.org/assets/bedrock.png'],
        },
      },

    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    })
  ],
  publicClient,
  webSocketPublicClient,
})

export const contractAddress = "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE";
export const chainDetails: { [key: string]: string } = {
  "250" : "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE",
  "137" : "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE"
}
export const RPC = "https://rpc.ftm.tools";