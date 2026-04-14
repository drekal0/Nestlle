import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown, Check } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const WalletButton = ({ variant = "default" }: { variant?: "default" | "compact" }) => {
  const { address, isConnected, isConnecting, balance, ensName, chainId, disconnect, connectMetaMask, connectWalletConnect, shortenAddress } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const chainName = chainId === 1 ? "Ethereum" : chainId === 137 ? "Polygon" : chainId === 42161 ? "Arbitrum" : `Chain ${chainId}`;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isConnected) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-primary/20 hover:border-primary/40 transition-all text-sm"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-medium">{ensName || shortenAddress(address)}</span>
          <ChevronDown size={14} className={`text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-72 glass rounded-xl border border-border p-4 z-50"
              >
                <div className="mb-3 pb-3 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Connected to {chainName}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm font-medium">{shortenAddress(address)}</p>
                    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={`https://etherscan.io/address/${address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="mb-3 pb-3 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Balance</p>
                  <p className="font-display text-lg font-bold">{balance} ETH</p>
                </div>

                <button
                  onClick={() => { disconnect(); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={14} />
                  Disconnect Wallet
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConnectModal(true)}
        className={`flex items-center gap-2 font-medium transition-all ${
          variant === "compact"
            ? "px-3 py-2 text-sm rounded-lg glass border border-border hover:border-primary/40"
            : "px-5 py-2.5 text-sm rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 text-primary"
        }`}
      >
        <Wallet size={16} />
        Connect Wallet
      </button>

      <AnimatePresence>
        {showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowConnectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 w-full max-w-sm border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground mb-6">Choose your preferred wallet to connect</p>

              <div className="space-y-3">
                <button
                  onClick={async () => { await connectMetaMask(); setShowConnectModal(false); }}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center text-xl">🦊</div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">MetaMask</p>
                    <p className="text-xs text-muted-foreground">Browser extension wallet</p>
                  </div>
                  {isConnecting && <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                </button>

                <button
                  onClick={async () => { await connectWalletConnect(); setShowConnectModal(false); }}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-xl">🔗</div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">WalletConnect</p>
                    <p className="text-xs text-muted-foreground">Scan with mobile wallet</p>
                  </div>
                  {isConnecting && <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By connecting, you agree to our Terms of Service
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletButton;
