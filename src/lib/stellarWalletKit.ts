import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

let initialized = false;

export function initStellarWalletsKit() {
  if (initialized || typeof window === "undefined") return;
  StellarWalletsKit.init({ modules: defaultModules() });
  initialized = true;
}
