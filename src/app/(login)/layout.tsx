import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { LoginProviders } from "./login-providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENADExp",
  description: "ENADExp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-full flex justify-center items-center bg-linear-to-tr from-secondary-yellow to-primary-green ${inter.className} antialiased`}
      >
        <LoginProviders>{children}</LoginProviders>
      </body>
    </html>
  );
}
