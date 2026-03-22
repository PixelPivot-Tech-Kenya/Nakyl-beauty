import type { Metadata } from "next";
import { Jost } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import CartDrawer from './components/ui/CartDrawer'

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
export const metadata: Metadata = {
  title: "Nakyl",
  description: "The best skincare products for your skin type, delivered to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className={`${jost.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
