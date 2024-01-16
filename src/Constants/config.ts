"use client";

import { fantom, polygon, fantomTestnet } from 'wagmi/chains';
import { createConfig, configureChains } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { Chain } from '@wagmi/core'
 
export const fantomSonicBuildersTestnet = {
  id: 64165,
  name: 'Fantom Sonic',
  network: 'Fantom Sonic',
  nativeCurrency: {
    decimals: 18,
    name: 'Fantom',
    symbol: 'FTM',
  },
  rpcUrls: {
    public: { http: ['https://rpc.sonic.fantom.network/'] },
    default: { http: ['https://rpc.sonic.fantom.network/'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://public-sonic.fantom.network' },
  },
} as const satisfies Chain;

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantom, polygon, fantomTestnet, fantomSonicBuildersTestnet],
  [publicProvider()],
)

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
});

export const tokenDeployerDetails: { [key: string]: string } = {
  "250" : "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE",
  "137" : "0x5746A1ec97d91c594e6042a7A42c8285C4c3A0EE"
}
export const multisendDetails: { [key: string]: string } = {
  "137" : "0x8264289EA0D12c3DB03b79a56f4961Ff91612aE1",
  "250" : "0xe1B8Fc8e02b9b2C8152dEB18c5D1f6C2b23f8a94",
  "4002" : "0xeC4993Ab1a113A15e94c33748344954E15451d4e",
}
