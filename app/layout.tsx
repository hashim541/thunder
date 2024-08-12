//app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { font } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Thunder",
  description: "Create your components faster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
            {`
              :root {
                --head-font: ${font.head.className};
                --body-font: ${font.body.className};
              }
            `}
        </style>
      </head>
      <body className={`${font.body.className} bg-background text-text h-screen`}>
        <div className='gradient'></div>
          {children}
      </body>
    </html>
  );
}
