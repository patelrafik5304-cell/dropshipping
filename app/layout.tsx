import type { Metadata } from "next";
import "./globals.css";
import { CartProvider, ProductsProvider, OrdersProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "SmartCart.in - Online Shopping for Electronics, Home & More",
  description: "Shop online for smart home devices, electronics, kitchen essentials and more at best prices in India. Free delivery, easy returns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
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
