import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Roboto } from 'next/font/google'
import { CartProvider } from "../app/context/CartContext"
import { AuthProvider } from "./context/AuthContext";
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Ulinzi Football Club Fan Engagement System",
  description: "Stay connected with the club and access exclusive fan content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
      >
        <AuthProvider>
        <Header />
            <CartProvider>
              <div className="content">{children}</div>
            </CartProvider>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
