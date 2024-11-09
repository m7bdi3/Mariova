import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Layout } from "@/lib/components/dom/Layout";

export const metadata: Metadata = {
  title: "Mariova",
  description: "Tommorrow's skincare today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "antialiased",
          GeistSans.className,
          `${GeistSans.variable} ${GeistMono.variable}`
        )}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Layout>
            <>{children}</>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
