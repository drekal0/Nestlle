import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Landmark, ArrowUpRight, DollarSign, Wallet, ShieldCheck, ChevronRight, History, Building2, Send } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

interface Transaction {
    id: string;
    type: "withdrawal" | "swap";
    amount: string;
    currency: string;
    status: "completed" | "pending" | "processing";
    timestamp: string;
}

const CashOut = () => {
    const { balance } = useWallet();
    const { user } = useUser();
    const [isSwapping, setIsSwapping] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [history, setHistory] = useState<Transaction[]>([]);

    const [bankDetails, setBankDetails] = useState({
        accountNumber: "",
        routingNumber: "",
        bankName: "",
        amount: "",
    });

    useEffect(() => {
        // Simulate fetch_all_transactions
        const mockHistory: Transaction[] = [
            { id: "tx_1", type: "withdrawal", amount: "250.00", currency: "USD", status: "completed", timestamp: "2024-03-15" },
            { id: "tx_2", type: "swap", amount: "500", currency: "XP", status: "completed", timestamp: "2024-03-14" },
        ];
        setHistory(mockHistory);
    }, []);

    const handleSwapXP = () => {
        if (user.xp < 100) {
            toast.error("Minimum 100 XP required to swap.");
            return;
        }
        setIsSwapping(true);
        setTimeout(() => {
            toast.success("Successfully swapped 100 XP for 10 USDC!");
            setIsSwapping(false);
        }, 1500);
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bankDetails.accountNumber || !bankDetails.routingNumber) {
            toast.error("Please fill in all bank details.");
            return;
        }
        setIsWithdrawing(true);
        // Simulate Linkio POST /v2/business_offramp
        setTimeout(() => {
            toast.success(`Withdrawal of ${bankDetails.amount} USDC initiated via Linkio.`);
            setIsWithdrawing(false);
            setHistory([{
                id: `tx_${Date.now()}`,
                type: "withdrawal",
                amount: bankDetails.amount,
                currency: "USD",
                status: "processing",
                timestamp: new Date().toISOString().split('T')[0]
            }, ...history]);
            setBankDetails({ accountNumber: "", routingNumber: "", bankName: "", amount: "" });
        }, 2000);
    };

    return (
        <DashboardLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Cash Out</h1>
                    <p className="text-muted-foreground">Off-ramp your earnings directly to your bank account via Linkio.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Linkio Withdrawal Form */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <Building2 size={20} className="text-primary" />
                                Bank Withdrawal (ACH / Domestic)
                            </h3>

                            <form onSubmit={handleWithdraw} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Chase Bank"
                                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={bankDetails.bankName}
                                            onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Amount (USDC)</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={bankDetails.amount}
                                            onChange={(e) => setBankDetails({ ...bankDetails, amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                                        <input
                                            type="password"
                                            placeholder="********"
                                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={bankDetails.accountNumber}
                                            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Routing Number</label>
                                        <input
                                            type="text"
                                            placeholder="123456789"
                                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                                            value={bankDetails.routingNumber}
                                            onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isWithdrawing}
                                    className="w-full mt-4 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isWithdrawing ? "Processing..." : <><Send size={18} /> Confirm Withdrawal</>}
                                </button>
                                <p className="text-[10px] text-center text-muted-foreground mt-2">
                                    Powered by **Linkio Global Bridge**. Standard ACH processing times apply (1-3 business days).
                                </p>
                            </form>
                        </div>

                        {/* Transaction History */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
                                <History size={16} /> Recent Transactions
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="pb-3 font-medium">Type</th>
                                            <th className="pb-3 font-medium">Amount</th>
                                            <th className="pb-3 font-medium">Status</th>
                                            <th className="pb-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {history.map((tx) => (
                                            <tr key={tx.id} className="group hover:bg-muted/30 transition-colors">
                                                <td className="py-4 flex items-center gap-2">
                                                    {tx.type === 'withdrawal' ? <Building2 size={14} className="text-primary" /> : <DollarSign size={14} className="text-accent" />}
                                                    <span className="capitalize">{tx.type}</span>
                                                </td>
                                                <td className="py-4 font-mono font-medium">{tx.amount} {tx.currency}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-muted-foreground">{tx.timestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
                            <h3 className="text-sm font-semibold text-accent mb-4">Level Up Rewards</h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-muted-foreground">Available XP</span>
                                <span className="font-bold text-xl">{user.xp}</span>
                            </div>
                            <button
                                onClick={handleSwapXP}
                                disabled={isSwapping || user.xp < 100}
                                className="w-full py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSwapping ? "Swapping..." : "Swap 100 XP for 10 USDC"}
                            </button>
                            <p className="text-[10px] text-muted-foreground mt-3 italic text-center">
                                * XP swaps are instant. USDC will be added to your on-chain wallet balance.
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Current Balances</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Wallet size={16} />
                                        </div>
                                        <span className="text-sm font-medium">XLM</span>
                                    </div>
                                    <span className="font-mono font-bold">{balance}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                                            <DollarSign size={16} />
                                        </div>
                                        <span className="text-sm font-medium">USDC</span>
                                    </div>
                                    <span className="font-mono font-bold">120.50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default CashOut;
