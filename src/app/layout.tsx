import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/header";
import { Providers } from "@/providers/provider";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main
            className={`flex flex-col h-[calc(100vh-${layoutConfig.headerHeight}-${layoutConfig.footerHeight})] w-full justify-start items-center`}
          >
            {children}
          </main>
          <footer
            className={`h-[${layoutConfig.footerHeight}] w-full flex items-center justify-center py-3`}
          >
            <p>{siteConfig.description}</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
