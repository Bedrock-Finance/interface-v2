import { Footer } from "@/Components/footer/footer";
import { NavbarMain } from "@/Components/navbarMain/navbarMain";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog | Bedrock Finance | Crypto News',
    description: 'Discover the latest news, insights, and developments in the Bedrock Finance.',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavbarMain />
            {children}
            <Footer />
        </>
    )
}
