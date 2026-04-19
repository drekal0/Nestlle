import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "How It Works", href: "#how-it-works" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isConnected } = useWallet();

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="font-display text-2xl font-bold text-gradient-primary">
          Nestlle
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          {isConnected ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow-primary"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {isConnected ? (
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm text-center"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
