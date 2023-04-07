import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  number?: string | null;
  location?: {
    lat: number | null;
    lng: number | null;
  };
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
