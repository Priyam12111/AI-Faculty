import { Noto_Sans_JP, Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata = {
  title: "AI Faculty - Nandani Tomar",
  description: "Learn Complex Concepts",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <html lang="en" className={`${roboto.variable} ${notoSansJP.variable}`}>
        <body className={roboto.className}>{children}</body>
      </html>
    </>
  );
}
