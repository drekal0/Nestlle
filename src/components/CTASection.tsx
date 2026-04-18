import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="join" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 lg:p-20 text-center max-w-3xl mx-auto border-primary/20"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build{" "}
            <span className="text-gradient-primary">Verifiable</span>{" "}
            Engagement?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Join Nestlle and become part of the next generation of Stellar-native community engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-lg glass text-foreground font-semibold hover:bg-muted transition-colors"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
