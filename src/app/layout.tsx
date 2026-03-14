import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-friendly",
});

export const metadata: Metadata = {
  title: "DentFlow — AI-Powered Practice Operations",
  description: "DentFlow — AI-Powered Practice Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            <MotionProvider>
              {children}
              <Toaster position="bottom-right" richColors />
              <Analytics />
            </MotionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
