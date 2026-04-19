import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="font-display text-xl font-bold text-gradient-primary">
          Nestlle
        </Link>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#community" className="hover:text-foreground transition-colors">Community</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Nestlle. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
