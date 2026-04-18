import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useWallet } from "./WalletContext";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isProfileComplete: boolean;
  completedTaskIds: string[];
  xp: number;
  isAdmin: boolean;
}

const ADMIN_ADDRESSES = [
  "GC2F6C5P7A4Y6R4E3W2Q1P0O9I8U7Y6T5R4E3W2Q1P0O9I8U7Y6T5R4E", // Placeholder admin
];

const defaultProfile: UserProfile = {
  name: "Anonymous User",
  email: "",
  avatar: "✨",
  isProfileComplete: false,
  completedTaskIds: [],
  xp: 0,
  isAdmin: false,
};

interface UserContextType {
  user: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeTask: (taskId: string, xpReward: number) => void;
  isLoaded: boolean;
  isAdmin: boolean;
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
          const profile = JSON.parse(saved);
          setUser({ ...profile, isAdmin: ADMIN_ADDRESSES.includes(address) });
        } catch (e) {
          console.error("Failed to parse user profile from local storage");
          setUser({ ...defaultProfile, isAdmin: ADMIN_ADDRESSES.includes(address) });
        }
      } else {
        setUser({ ...defaultProfile, isAdmin: ADMIN_ADDRESSES.includes(address) });
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

  const completeTask = (taskId: string, xpReward: number) => {
    if (!address) return;
    setUser((prev) => {
      // Prevent duplicate processing
      if (prev.completedTaskIds.includes(taskId)) return prev;

      const updated = {
        ...prev,
        completedTaskIds: [...prev.completedTaskIds, taskId],
        xp: prev.xp + xpReward
      };
      localStorage.setItem(`nestlle_user_${address}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, completeTask, isLoaded, isAdmin: user.isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
