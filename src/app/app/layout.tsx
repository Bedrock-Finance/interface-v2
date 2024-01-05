"use client"

// RootLayout.tsx

import { VerticalNavbar } from "@/Components/verticalNavbar/verticalNavbar";

import { Navbar } from "@/Components/navbar/navbar";

import { useState } from "react";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isVerticalNavOpen, setIsVerticalNavOpen] = useState<boolean>(true);

    const handleOpenChange = (isOpen: boolean) => {
        setIsVerticalNavOpen(isOpen);
    };
    return (
        <div>
            <Navbar isApp={true} onOpenChange={handleOpenChange}/>
            <VerticalNavbar isOpen={isVerticalNavOpen}>
                {children}
            </VerticalNavbar>
        </div>
    )
}
