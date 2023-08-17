import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  avatar: string;
  email: string;
  name: string;
  number: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface AuthStore {
  user: User | null;
  setUser: (partialUser: Partial<User>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set, _) => ({
      user: {
        id: "",
        avatar: "",
        email: "",
        name: "",
        number: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (partialUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        })),
      setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
      setIsOnboarded: (isOnboarded: boolean) =>
        set((state) => ({ isOnboarded })),
    }),
    {
      name: "cruisemate-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
