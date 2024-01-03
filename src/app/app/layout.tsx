import { VerticalNavbar } from "@/Components/verticalNavbar/verticalNavbar"

import { Navbar } from "@/Components/navbar/navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
        {children}
        </div>
    )
}
