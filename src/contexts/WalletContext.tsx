import { createContext, useContext, useState, useCallback, useLayoutEffect, ReactNode } from "react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { KitEventType } from "@creit.tech/stellar-wallets-kit/types";
import { initStellarWalletsKit } from "@/lib/stellarWalletKit";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
}

interface WalletContextType extends WalletState {
  disconnect: () => Promise<void>;
  shortenAddress: (addr?: string | null) => string;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};

/** Stellar public keys start with G and are 56 chars. */
const shortenAddress = (addr?: string | null) => {
  if (!addr) return "";
  if (addr.startsWith("G") && addr.length > 8) {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  }
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

async function fetchXlmBalance(address: string): Promise<string> {
  try {
    const res = await fetch(`https://horizon.stellar.org/accounts/${address}`);
    if (!res.ok) return "—";
    const data = (await res.json()) as {
      balances?: { asset_type: string; balance: string }[];
    };
    const native = data.balances?.find((b) => b.asset_type === "native");
    return native ? Number(native.balance).toFixed(4) : "0";
  } catch {
    return "—";
  }
}

const emptyWallet: WalletState = {
  address: null,
  isConnected: false,
  balance: "0",
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletState>(emptyWallet);

  useLayoutEffect(() => {
    initStellarWalletsKit();

    const syncFromKit = async () => {
      try {
        const { address } = await StellarWalletsKit.getAddress();
        const balance = address.startsWith("G") ? await fetchXlmBalance(address) : "0";
        setWallet({
          address,
          isConnected: true,
          balance,
        });
      } catch {
        setWallet(emptyWallet);
      }
    };

    void syncFromKit();

    const offState = StellarWalletsKit.on(KitEventType.STATE_UPDATED, () => {
      void syncFromKit();
    });
    const offDisconnect = StellarWalletsKit.on(KitEventType.DISCONNECT, () => {
      setWallet(emptyWallet);
    });

    return () => {
      offState();
      offDisconnect();
    };
  }, []);

  const disconnect = useCallback(async () => {
    await StellarWalletsKit.disconnect();
    setWallet(emptyWallet);
  }, []);

  return (
    <WalletContext.Provider value={{ ...wallet, disconnect, shortenAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
