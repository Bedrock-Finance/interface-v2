"use client"

import { Navbar } from "@/Components/navbar/navbar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
