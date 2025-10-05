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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-pink-50/30">
          <Header />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}