import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import ParticulasFundo from "./components/ParticulasFundo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalogo de Vendas",
  description: "Os melhores produtos para você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ParticulasFundo />
        <Header />
        {children}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p>© 2026 Catálogo de Vendas. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
