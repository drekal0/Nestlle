import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  balance: string;
  ensName: string | null;
}

interface WalletContextType extends WalletState {
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
  shortenAddress: (addr?: string | null) => string;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};

const shortenAddress = (addr?: string | null) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

// Simulate wallet interactions for demo
const generateMockAddress = () => {
  const chars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) addr += chars[Math.floor(Math.random() * 16)];
  return addr;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    balance: "0",
    ensName: null,
  });

  const connectMetaMask = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true }));

    // Check if MetaMask is available
    if (typeof window !== "undefined" && (window as any).ethereum?.isMetaMask) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await (window as any).ethereum.request({
          method: "eth_chainId",
        });
        const balance = await (window as any).ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });
        const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
        setWallet({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
          chainId: parseInt(chainId, 16),
          balance: ethBalance,
          ensName: null,
        });
      } catch {
        setWallet((prev) => ({ ...prev, isConnecting: false }));
      }
    } else {
      // Demo fallback when MetaMask not installed
      await new Promise((r) => setTimeout(r, 1200));
      setWallet({
        address: generateMockAddress(),
        isConnected: true,
        isConnecting: false,
        chainId: 1,
        balance: "1.2450",
        ensName: null,
      });
    }
  }, []);

  const connectWalletConnect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true }));
    // Simulate WalletConnect flow
    await new Promise((r) => setTimeout(r, 1500));
    setWallet({
      address: generateMockAddress(),
      isConnected: true,
      isConnecting: false,
      chainId: 1,
      balance: "0.8320",
      ensName: "user.eth",
    });
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      balance: "0",
      ensName: null,
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{ ...wallet, connectMetaMask, connectWalletConnect, disconnect, shortenAddress }}
    >
      {children}
    </WalletContext.Provider>
  );
};
