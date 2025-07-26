import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Custom Plant font for headers
const plantFont = localFont({
  src: [
    {
      path: './fonts/plantc.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/plantc.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-plant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biduk-Biduk",
  description: "Explore the beauty of Biduk-Biduk village",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${plantFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
