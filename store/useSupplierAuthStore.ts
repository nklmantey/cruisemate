import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Supplier {
  id: string;
  email: string;
  shopName: string;
  number: string;
  shopLocation: {
    lat: number;
    lng: number;
  };
}

interface AuthStore {
  supplier: Supplier | null;
  setSupplier: (partialSupplier: Partial<Supplier>) => void;
  isSupplierLoggedIn: boolean;
  setIsSupplierLoggedIn: (isSupplierLoggedIn: boolean) => void;
  isSupplierOnboarded: boolean;
  setIsSupplierOnboarded: (setIsSupplierOnboarded: boolean) => void;
}

export const useSupplierAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      supplier: {
        id: "",
        email: "",
        shopName: "",
        number: "",
        shopLocation: {
          lat: 0,
          lng: 0,
        },
      },
      isSupplierLoggedIn: false,
      isSupplierOnboarded: false,
      setSupplier: (partialSupplier) =>
        set((state) => ({
          supplier: state.supplier
            ? { ...state.supplier, ...partialSupplier }
            : null,
        })),
      setIsSupplierLoggedIn: (isSupplierLoggedIn: boolean) =>
        set((state) => ({ isSupplierLoggedIn })),
      setIsSupplierOnboarded: (isSupplierOnboarded: boolean) =>
        set((state) => ({ isSupplierOnboarded })),
    }),
    {
      name: "cruisemate-supplier-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
