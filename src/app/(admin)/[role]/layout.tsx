import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AdminProviders } from "./admin-providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENADExp",
  description: "ENADExp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full min-h-screen flex flex-col items-center ${inter.className}`}
      >
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}
