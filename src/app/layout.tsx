import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "PER4MANCE • Plataforma de Cursos",
  description:
    "A plataforma de recuperação esportiva da PER4MANCE by Gustavo Vieira. 9 protocolos para tratar lesões e blindar o seu corpo — estilo Netflix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0b0f] text-neutral-100">{children}</body>
    </html>
  );
}
