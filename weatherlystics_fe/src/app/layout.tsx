import type { Metadata } from "next";
import "./globals.scss";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Weatherlystics",
  description:
    "A weather app that provides weather information for cities around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <ReactQueryProvider>
          <ToastContainer
            autoClose={5000}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
