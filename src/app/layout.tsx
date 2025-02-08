import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { Noto_Sans, Noto_Sans_TC, Rubik } from "next/font/google";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { TopNav } from "~/components/top-nav";
import { ThemeProvider } from "~/components/theme-provider";

// const rubik = Rubik({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-sans",
// });

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EE Shop HK",
  description: "EE Shop HK",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="zh">
        <body
          className={`${notoSans.className} grid h-screen grid-rows-[auto,1fr] antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
          <TopNav />
          {children}
          <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
