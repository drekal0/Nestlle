import { useLayoutEffect, useRef } from "react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { initStellarWalletsKit } from "@/lib/stellarWalletKit";

type StellarKitConnectButtonProps = {
  /** Applied to the host element the kit mounts into */
  className?: string;
};

/**
 * Official Stellar Wallets Kit connect control (see https://stellarwalletskit.dev).
 * Mount once per container; parent should control layout via className.
 */
const StellarKitConnectButton = ({ className }: StellarKitConnectButtonProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    initStellarWalletsKit();
    void StellarWalletsKit.createButton(el);

    return () => {
      el.replaceChildren();
    };
  }, []);

  return <div ref={hostRef} className={className} />;
};

export default StellarKitConnectButton;
