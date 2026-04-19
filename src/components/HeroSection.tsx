import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useWallet } from "@/contexts/WalletContext";

const HeroSection = () => {
  const { isConnected } = useWallet();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-accent tracking-wider uppercase mb-6">
            The Engagement Layer on Stellar
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Fun on the Surface.{" "}
          <span className="text-gradient-primary">Trust Underneath.</span>{" "}
          <span className="text-gradient-gold">Community Within.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          A verifiable engagement hub where communities play, learn, and earn — powered by Stellar transparency and anchored in a verifiable digital economy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {isConnected ? (
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
            >
              Get Started
            </Link>
          )}
          <a
            href="#features"
            className="px-8 py-3.5 rounded-lg glass text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Explore Features
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
