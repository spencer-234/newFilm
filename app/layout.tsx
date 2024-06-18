import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NewFilm",
  description: "Movies, TV Shows, and more all in one place. NewFilm is the new home for media on the web.",
  icons: {
    icon: 'assets/logo.png',
  },
  keywords: "movies, film, best movies, tv, tv shows, action, action movies, action shows, comedy, comedy movies, comedy shows, drama, drama movies, drama shows, horror, horror movies, horror shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
