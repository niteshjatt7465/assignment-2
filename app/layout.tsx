import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description:
    "Track your learning progress, courses, and daily streak on the LearnFlow student dashboard.",
  keywords: ["learning", "education", "courses", "dashboard", "e-learning"],
  openGraph: {
    title: "LearnFlow — Student Dashboard",
    description: "Your personal learning command center.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ background: "#080B10", color: "#fff" }}
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0" id="main-content">
            {children}
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
