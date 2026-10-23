import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juzgado 4° de Familia | Sistema Judicial y Gestión de Gestores",
  description:
    "Plataforma institucional del Despacho Judicial Dr. Juan Pablo Velásquez para gestión de gestores y control de tutelas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#F8F9FA] min-h-screen">{children}</body>
    </html>
  );
}
