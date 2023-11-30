import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: process.env.PORTFOLIO_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen h-screen overflow-hidden">
        <div className="flex w-full h-full overflow-y-hidden">{children}</div>
      </body>
    </html>
  );
}
