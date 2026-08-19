import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "@/components/ThemeInitializer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRATIMA VANAKHADE // CYBER OPERATIONS",
  description:
    "Cybersecurity student building toward security engineering. Automated penetration testing framework, SOC concepts, VAPT and security automation — presented as a personal cyber operations interface.",
  authors: [{ name: "Pratima Vanakhade" }],
  keywords: [
    "cybersecurity",
    "penetration testing",
    "SOC",
    "vulnerability assessment",
    "security automation",
    "FastAPI",
    "Nmap",
    "OWASP ZAP",
  ],
  openGraph: {
    title: "PRATIMA VANAKHADE // CYBER OPERATIONS",
    description:
      "Student today. Security engineer in the making. A portfolio disguised as a cyber operations interface.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${chakra.variable} ${jetbrains.variable}`}
    >
      <body>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}