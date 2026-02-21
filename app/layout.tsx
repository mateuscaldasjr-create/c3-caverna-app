import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "C3 Academy - Portal da Mordomia",
  description: "Sistema de Gerenciamento de Foco e Rituais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
