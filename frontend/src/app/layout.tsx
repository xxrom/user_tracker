import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./global.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Users Tracker",
  description: "Analog Google Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grid grid-cols-[1fr] grid-rows-[1fr] min-h-screen max-h-screen font-sans antialiased justify-center  overflow-scroll",
          fontSans.variable,
        )}
      >
        <div className="grid grid-cols-[1fr] w-full md:max-w-[900px] justify-self-center overflow-scroll p-4 pt-8 sm:p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
