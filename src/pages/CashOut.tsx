import { motion } from "framer-motion";
import { Landmark, ArrowUpRight, DollarSign, Wallet, ShieldCheck, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";

const CashOut = () => {
    const { balance } = useWallet();
    const { user } = useUser();

    const offrampOptions = [
        {
            id: "bank",
            title: "Bank Account",
            subtitle: "Direct deposit via MoneyGram Access",
            fee: "0.5%",
            time: "1-3 days",
            icon: <Landmark className="text-secondary" />
        },
        {
            id: "anchor",
            title: "Stellar Anchor",
            subtitle: "Off-ramp using SEP-24 providers",
            fee: "Variable",
            time: "Immediate",
            icon: <ArrowUpRight className="text-primary" />
        }
    ];

    return (
        <DashboardLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-8">
                    <h1 className="font-display text-3xl font-bold mb-2">Cash Out</h1>
                    <p className="text-muted-foreground">Convert your rewards and Stellar assets to fiat currency.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-accent" />
                                Select Withdrawal Method
                            </h3>

                            <div className="space-y-4">
                                {offrampOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        className="w-full text-left p-4 rounded-xl border border-border bg-card/50 hover:bg-muted/50 transition-colors group flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-border">
                                                {opt.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{opt.title}</p>
                                                <p className="text-xs text-muted-foreground">{opt.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div className="hidden sm:block">
                                                <p className="text-xs font-medium text-muted-foreground">Fee: {opt.fee}</p>
                                                <p className="text-[10px] text-muted-foreground">{opt.time}</p>
                                            </div>
                                            <ChevronRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="glass rounded-2xl p-6 bg-accent/5 border-accent/20">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                                    <DollarSign size={48} className="text-accent" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-lg font-bold">XP to USDC Rewards</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        You have <b>{user.xp} XP</b> available. Level 10 users and above can swap XP for USDC on local off-ramps.
                                    </p>
                                    <button disabled className="mt-4 px-6 py-2 rounded-lg bg-accent text-accent-foreground font-medium opacity-50 cursor-not-allowed text-sm">
                                        Coming Soon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Your Balances</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Wallet size={16} />
                                        </div>
                                        <span className="text-sm font-medium">XLM</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">{balance}</span>
                                </div>
                                <div className="flex items-center justify-between opacity-60">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                                            <DollarSign size={16} />
                                        </div>
                                        <span className="text-sm font-medium">USDC</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">0.00</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                    Off-ramps powered by Stellar SIP-24 architecture. MoneyGram Access allows you to cash out USDC to physical cash at over 400,000 locations worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default CashOut;
