import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import ParticulasFundo from "./components/ParticulasFundo";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import { AvaliacaoProvider } from "./contexts/AvaliacaoContext";
import { HistoricoProvider } from "./contexts/HistoricoContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagicX",
  description: "Componentes eletrônicos para os teus projetos",
    icons: {
    icon: [
      { url: "/MagicX_logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
  },
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
        <AuthProvider>
        <AdminProvider>
        <CarrinhoProvider>
        <HistoricoProvider>
        <AvaliacaoProvider>
        <ParticulasFundo />
        <Header />
        {children}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p>© 2026 MagicX. Todos os direitos reservados.</p>
          </div>
        </footer>
        </AvaliacaoProvider>
        </HistoricoProvider>
        </CarrinhoProvider>
        </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}