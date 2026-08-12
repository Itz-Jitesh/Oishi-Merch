"use client";

import { createContext, useContext } from "react";
import { SessionProvider } from "next-auth/react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartContext.Provider value={{}}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}