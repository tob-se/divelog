import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Divelog",
  description: "Highly opinionated diving logbook",
  appleWebApp: {
    title: "Divelog",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-muted/40")}>
        <main className="flex h-[calc(100dvh)] flex-col items-center p-3">
          <div className="flex max-h-full w-full max-w-sm flex-col gap-3">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
