import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { Rubik } from "next/font/google";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { TopNav } from "~/components/top-nav";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EE Shop HK",
  description: "EE Shop HK",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${rubik.className} grid h-screen grid-rows-[auto,1fr] antialiased`}
        >
          <TopNav />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
