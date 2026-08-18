import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/inter";

export const metadata: Metadata = {
  title: "WIN Holdings",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
