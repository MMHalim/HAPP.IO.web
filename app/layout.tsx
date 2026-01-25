import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { ColorModeScript } from "@chakra-ui/react";
import "./globals.css";
import { Providers } from "./providers";
import { LOGO_URL, FAVICON_URL } from "@/lib/constants";
import theme from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "HAPP.IO",
  description: "Build your dream software with expert developers.",
  icons: {
    icon: FAVICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
