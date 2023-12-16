import "./globals.css"

import { Navbar } from "@/Components/navbar/navbar";

import type { WindowProvider } from '@wagmi/connectors'
import { config } from "@/Constants/config";
import { WagmiConfig } from "wagmi";

import { ToastContainer } from "react-toastify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Bedrock Finance | Create No-Code Cryptocurrencies',
  description: 'With Bedrock Finance you can tokenize assets in seconds. Tokens are gas efficient, safe and have undergone extensive testing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <ToastContainer />
          <Navbar />
          {children}
        </WagmiConfig>
      </body>
    </html>
  )
}
