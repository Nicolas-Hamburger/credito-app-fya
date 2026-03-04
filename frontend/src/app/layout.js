import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Fya Social Capital",
  description: "Sistema de registro de créditos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon-1.png" />
      </head>
      <body className={geist.className}>
        {/* Navbar */}
        <nav className="bg-[#1a4731] text-white px-8 py-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Fya Social Capital"
              width={80}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-green-300 transition-colors">
              Registrar Crédito
            </Link>
            <Link
              href="/consulta"
              className="hover:text-green-300 transition-colors"
            >
              Consultar Créditos
            </Link>
          </div>
        </nav>

        {/* Contenido de cada página */}
        <main className="min-h-screen bg-gray-50 p-8">{children}</main>
      </body>
    </html>
  );
}
