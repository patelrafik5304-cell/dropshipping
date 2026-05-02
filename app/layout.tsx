import type { Metadata } from "next";
import "./globals.css";
import { CartProvider, ProductsProvider, OrdersProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Smart Home Dropshipping Store",
  description: "Discover the latest smart home devices for automation, security, and energy savings. Shop thermostats, cameras, lights, and more with fast shipping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <OrdersProvider>
          <ProductsProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ProductsProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}