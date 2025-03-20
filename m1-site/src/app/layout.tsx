
import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import "./global.css";


export const metadata: Metadata = {
  title: "Library Management System",
  description: "A book management system for a library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}