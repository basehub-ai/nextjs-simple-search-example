import { basehub } from "basehub";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await basehub({ next: { revalidate: 360 } }).query({
    meta: { title: true, description: true },
  });

  return {
    title: meta.title,
    description: meta.description,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
