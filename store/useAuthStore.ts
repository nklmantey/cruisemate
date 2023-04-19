import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string | null;
  avatar: string | null;
  email: string | null;
  name: string | null;
  number: string | null;
  location: {
    lat: number | null;
    lng: number | null;
  };
}

interface AuthStore {
  user: User | null;
  setUser: (partialUser: Partial<User>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      user: null,
      isLoggedIn: false,
      setUser: (partialUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
