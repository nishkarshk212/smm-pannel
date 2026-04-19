"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Static conversion rate for now (1 USD = 83 INR)
const USD_TO_INR = 83;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selected_currency") as Currency;
    if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "INR")) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("selected_currency", newCurrency);
  };

  const convertPrice = (amount: number) => {
    if (currency === "INR") {
      return amount * USD_TO_INR;
    }
    return amount;
  };

  const formatPrice = (amount: number) => {
    const converted = convertPrice(amount);
    if (currency === "INR") {
      return `₹${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
