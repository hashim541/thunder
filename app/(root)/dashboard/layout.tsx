// app/(root)/dashboard/layout.tsx
'use client'
import DashboardNavbar from '@/components/DashboardNavbar';
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
        <SessionProvider>
          <DashboardNavbar/>
          <section className="flex-1 w-full max-w-[1200px] sm:px-3 px-2 h-full ">
            {children}
          </section>
        </SessionProvider>
    </main>
  );
}
