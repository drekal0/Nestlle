import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Wallet, CheckCircle2, ExternalLink } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

interface ClaimBadgeModalProps {
  badgeName: string;
  badgeIcon: string;
  isOpen: boolean;
  onClose: () => void;
}

const randomStellarTxHash = () => {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
};

const ClaimBadgeModal = ({ badgeName, badgeIcon, isOpen, onClose }: ClaimBadgeModalProps) => {
  const { isConnected, address, shortenAddress } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [txHash] = useState(() => randomStellarTxHash());

  const handleMint = async () => {
    setIsMinting(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsMinting(false);
    setMinted(true);
  };

  const txUrl = `https://stellar.expert/explorer/public/tx/${txHash}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-8 w-full max-w-sm border border-border text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>

            {minted ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <div className="text-6xl mb-4">{badgeIcon}</div>
                <CheckCircle2 size={32} className="text-green-400 mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold mb-1">Badge recorded</h3>
                <p className="text-sm text-muted-foreground mb-4">{badgeName} is linked to your Stellar account</p>
                <div className="glass rounded-lg p-3 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Transaction</p>
                  <a
                    href={txUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary hover:underline flex items-center justify-center gap-1"
                  >
                    {txHash.slice(0, 12)}...{txHash.slice(-8)}
                    <ExternalLink size={10} />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <>
                <div className="w-24 h-24 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center text-5xl mx-auto mb-4">
                  {badgeIcon}
                </div>
                <h3 className="font-display text-xl font-bold mb-1">Claim badge</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Mint <strong className="text-foreground">{badgeName}</strong> as a verifiable soulbound-style badge on Stellar
                </p>

                {!isConnected ? (
                  <div className="glass rounded-xl p-6">
                    <Wallet size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Connect your Stellar wallet to claim</p>
                  </div>
                ) : (
                  <>
                    <div className="glass rounded-lg p-3 mb-4 text-left">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Account</span>
                        <span>{shortenAddress(address)}</span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Network</span>
                        <span>Stellar Public Network</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Fee</span>
                        <span className="text-accent">Minimal XLM (base reserve / ops)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleMint}
                      disabled={isMinting}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isMinting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Award size={16} />
                          Claim badge
                        </>
                      )}
                    </button>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClaimBadgeModal;
