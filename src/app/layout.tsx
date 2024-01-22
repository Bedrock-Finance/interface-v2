import "./globals.css"

import { Footer } from "@/Components/footer/footer";

import { Inter } from 'next/font/google';

import { config } from "@/Constants/config";
import { WagmiConfig } from "wagmi";

import { ToastContainer } from "react-toastify";
import { Metadata } from "next";

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: {
    default: 'Bedrock Finance | Create No-Code Cryptocurrencies',
    template: '%s | Bedrock Finance',
  },
  description: 'With Bedrock Finance you can tokenize assets in seconds. Tokens are gas efficient, safe and have undergone extensive testing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <WagmiConfig config={config}>
          <ToastContainer />
          {children}
        </WagmiConfig>
      </body>
    </html>
  )
}
