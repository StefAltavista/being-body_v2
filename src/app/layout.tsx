import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuButton from "@/components/MenuButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // metadataBase: new URL("https://beingbody.net"),

  title: "Being Body",
  description: "Massage - Bodywork - Pilates - Movement",

  openGraph: {
    title: "Being Body",
    description: "Massage - Bodywork - Pilates - Movement",
    images: [
      {
        url: "/img/openGraphsImg.png",
        width: 1200,
        height: 630,
        alt: "Being Body",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Being Body",
    description: "Massage - Bodywork - Pilates - Movement",
    images: ["/img/openGraphsImg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div className="flex flex-col overflow-hidden w-[100vw]">
          <Header />

          <div className="mt-[100px]"></div>
          {children}
          <Footer />
          <MenuButton />
        </div>
      </body>
    </html>
  );
}
