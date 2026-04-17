import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { SwkAppDarkTheme } from "@creit.tech/stellar-wallets-kit/types";

let initialized = false;

export function initStellarWalletsKit() {
  if (initialized || typeof window === "undefined") return;
  StellarWalletsKit.init({
    theme: SwkAppDarkTheme,
    modules: defaultModules()
  });
  initialized = true;
}
