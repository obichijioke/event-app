import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/lib/SessionProvider";
import Footer from "@/components/Footer";
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Event App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${roboto.className} antialiased bg-gray-100`}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
