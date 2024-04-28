import ReactQueryProvider from "@/components/ReactQueryProvider";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "../styles/globals.scss";

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
      <body className="layout">
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
          <div className="content">
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
