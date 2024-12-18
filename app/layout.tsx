import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/react-query-provider";

import { Poppins, Roboto } from "next/font/google";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "FireGrid",
  description: "FireGrid is task management and collaboration tool inspired by Trello. It offers an intuitive Kanban board interface for organizing and tracking tasks eed and scalability, FireGrid leverages the latest features of Next.js 15 RC efficiently.",
};

export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider


    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.className}`}
        >
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
