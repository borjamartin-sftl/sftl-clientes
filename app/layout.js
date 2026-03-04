import "./globals.css";

export const metadata = {
  title: "SFTL · Incentiva - Clientes",
  description: "Gestión de clientes de Sympathy for the Lawyer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
