import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ICT at IRI Challenge",
  description: "ICT at IRI Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
        />
        {children}
      </body>
    </html>
  );
}
