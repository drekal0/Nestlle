import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, Loader2 } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const Login = () => {
  const navigate = useNavigate();
  const { connectMetaMask, connectWalletConnect, isConnecting } = useWallet();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleWalletLogin = async (method: "metamask" | "walletconnect") => {
    if (method === "metamask") {
      await connectMetaMask();
    } else {
      await connectWalletConnect();
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-gradient-primary">
            Nestlle
          </Link>
          <h1 className="font-display text-2xl font-bold mt-6">Welcome back</h1>
          <p className="text-muted-foreground text-sm mt-2">Log in to your Nestlle account</p>
        </div>

        <div className="glass rounded-2xl p-8">
          {/* Wallet Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleWalletLogin("metamask")}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-muted/50 text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2 size={18} className="text-primary animate-spin" />
              ) : (
                <span className="text-lg">🦊</span>
              )}
              Login with MetaMask
            </button>
            <button
              onClick={() => handleWalletLogin("walletconnect")}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-muted/50 text-sm font-medium hover:bg-muted hover:border-primary/30 transition-all disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2 size={18} className="text-primary animate-spin" />
              ) : (
                <Wallet size={18} className="text-primary" />
              )}
              Login with WalletConnect
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or use email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
            >
              Login
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
