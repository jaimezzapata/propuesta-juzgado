import type { Metadata } from "next";
import "./globals.css";
import { EstiloVisualProvider } from "@/features/estilos/context/EstiloVisualContext";
import { WidgetAparienciaFlotante } from "@/features/estilos/components/WidgetAparienciaFlotante";

export const metadata: Metadata = {
  title: "Juzgado 4° de Familia | Sistema Judicial y Gestión de Gestores",
  description:
    "Plataforma institucional del Despacho Judicial Dr. Juan Pablo Velásquez para gestión de gestores y control de tutelas.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        <EstiloVisualProvider>
          {children}
          <WidgetAparienciaFlotante />
        </EstiloVisualProvider>
      </body>
    </html>
  );
}
