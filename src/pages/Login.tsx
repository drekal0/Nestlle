import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";
import StellarKitConnectButton from "@/components/StellarKitConnectButton";

const Login = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { user, isLoaded } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isConnected && isLoaded) {
      if (user.isProfileComplete) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/dashboard/profile", { replace: true });
      }
    }
  }, [isConnected, isLoaded, user.isProfileComplete, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="mb-6">
            <div className="w-full rounded-xl border border-border bg-muted/50 px-4 py-4 text-sm">
              <p className="text-xs text-muted-foreground mb-3 text-center">Log in with a Stellar wallet (Stellar Wallets Kit)</p>
              <div className="flex min-h-[48px] w-full items-center justify-center [&_button]:max-w-full">
                <StellarKitConnectButton className="w-full flex justify-center" />
              </div>
            </div>
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
