import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devlev - מערכת ניהול קורסים",
  description: "מערכת מתקדמת לניהול וחקירת קורסים אקדמיים",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}