import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Big Fat Roll | Premium Signature Rolls",
  description: "Bold, indulgent, and vibrant fast-food brand serving Signature Rolls, Burgers, and Refreshing Drinks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-stone-950 text-stone-50">{children}</body>
    </html>
  );
}
