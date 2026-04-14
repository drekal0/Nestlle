import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Wallet, CheckCircle2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

interface TipCreatorModalProps {
  creatorName: string;
  isOpen: boolean;
  onClose: () => void;
}

const tipAmounts = [
  { label: "0.001 ETH", value: "0.001", usd: "~$3" },
  { label: "0.005 ETH", value: "0.005", usd: "~$15" },
  { label: "0.01 ETH", value: "0.01", usd: "~$30" },
  { label: "0.05 ETH", value: "0.05", usd: "~$150" },
];

const TipCreatorModal = ({ creatorName, isOpen, onClose }: TipCreatorModalProps) => {
  const { isConnected, balance } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState("0.005");
  const [customAmount, setCustomAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleTip = async () => {
    setIsSending(true);
    // Simulate transaction
    await new Promise((r) => setTimeout(r, 2000));
    setIsSending(false);
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 2500);
  };

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
            className="glass rounded-2xl p-8 w-full max-w-md border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-accent" />
                <h3 className="font-display text-lg font-bold">Tip Creator</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {sent ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-8">
                <CheckCircle2 size={48} className="text-green-400 mx-auto mb-3" />
                <h4 className="font-display text-xl font-bold mb-1">Tip Sent!</h4>
                <p className="text-sm text-muted-foreground">
                  {customAmount || selectedAmount} ETH sent to {creatorName}
                </p>
              </motion.div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Send a tip to <strong className="text-foreground">{creatorName}</strong> for their contribution
                </p>

                {!isConnected ? (
                  <div className="text-center py-6 glass rounded-xl">
                    <Wallet size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Connect your wallet to send tips</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {tipAmounts.map((tip) => (
                        <button
                          key={tip.value}
                          onClick={() => { setSelectedAmount(tip.value); setCustomAmount(""); }}
                          className={`px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedAmount === tip.value && !customAmount
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <span className="block">{tip.label}</span>
                          <span className="text-xs text-muted-foreground">{tip.usd}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mb-4">
                      <label className="text-xs text-muted-foreground mb-1.5 block">Custom amount (ETH)</label>
                      <input
                        type="number"
                        step="0.001"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(""); }}
                        placeholder="0.00"
                        className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Your balance: {balance} ETH</span>
                      <span>Network fee: ~0.0005 ETH</span>
                    </div>

                    <button
                      onClick={handleTip}
                      disabled={isSending || (!selectedAmount && !customAmount)}
                      className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          <Heart size={16} />
                          Send {customAmount || selectedAmount} ETH
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

export default TipCreatorModal;
