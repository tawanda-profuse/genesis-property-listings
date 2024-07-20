"use client";
import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import "./globals.css";
import { Inter } from 'next/font/google'; // Optional: import fonts if needed

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Genesis Property Listings",
//   description: "A web application for property listings",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
