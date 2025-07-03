import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { Providers } from "@/providers/provider";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/UI/layout/title";

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("session", session);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <Title />
              <main
                className={`flex flex-col w-full justify-start items-center`}
                style={{
                  height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`
                }}
              >
                {children}
              </main>
              <footer
                className={`w-full flex items-center justify-center py-3`}
                style={{ height: layoutConfig.footerHeight }}
              >
                <p>{siteConfig.description}</p>
              </footer>
            </AppLoader>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
