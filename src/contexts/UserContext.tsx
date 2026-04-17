import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useWallet } from "./WalletContext";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isProfileComplete: boolean;
}

const defaultProfile: UserProfile = {
  name: "Anonymous User",
  email: "",
  avatar: "✨",
  isProfileComplete: false,
};

interface UserContextType {
  user: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useWallet();
  const [user, setUser] = useState<UserProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      const storageKey = `nestlle_user_${address}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse user profile from local storage");
          setUser(defaultProfile);
        }
      } else {
        setUser(defaultProfile);
      }
      setIsLoaded(true);
    } else {
      setUser(defaultProfile);
      setIsLoaded(false);
    }
  }, [isConnected, address]);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!address) return;
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(`nestlle_user_${address}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
