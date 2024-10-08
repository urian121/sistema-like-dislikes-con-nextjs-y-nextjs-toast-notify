import { Inter } from "next/font/google";
import "./globals.css";

// import 'globals.css';
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Likes y Dislikes con Next.JS",
  description:
    "Sistema de Likes y Dislikes con Next.JS implementando el paquete nextjs-toast-notify para notificar al usuario de la forma mas agradable la acción realizada.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
