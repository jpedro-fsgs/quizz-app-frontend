import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Roboto } from "next/font/google";

export const metadata = {
    title: "Quiz App",
    description: "A quiz application",
};

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-sans",
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={roboto.variable}
            // suppressHydrationWarning
        >
            <body className="font-sans">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
