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
            Join the waitlist to be among the first communities, creators, and learners on Nestlle.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary whitespace-nowrap">
              Get Early Access
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            No spam. Just updates on launch and early access perks.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
