"use client";

import localFont from "next/font/local";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import MenuComponent from "./components/menu-component";
import { AuthConsumer, AuthProvider } from "./context/AuthContext";
import FooterComponent from "./components/footer-component";

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

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthConsumer>
            {() => {
              return (
                <>
                  <MenuComponent />
                  {children}
                  <FooterComponent />
                </>
              );
            }}
          </AuthConsumer>
        </AuthProvider>
      </body>
    </html>
  );
}
