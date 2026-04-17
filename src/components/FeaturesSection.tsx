import { motion } from "framer-motion";
import { Gamepad2, ListChecks, Brain, MapPin, Coins, Shield } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Game Hub",
    description: "Mini-games, leaderboards, and community-vs-community challenges designed for retention and fun.",
    accent: "primary",
  },
  {
    icon: ListChecks,
    title: "Custom Task Builder",
    description: "Design engagement campaigns with social, on-chain, educational, and real-world tasks — with chaining and auto-verification.",
    accent: "accent",
  },
  {
    icon: Brain,
    title: "Knowledge & Quiz Layer",
    description: "Learn → Participate → Earn. Create quizzes tied to protocols, culture, or onboarding with proof-of-knowledge badges on Stellar.",
    accent: "primary",
  },
  {
    icon: MapPin,
    title: "IRL Event Verification",
    description: "Bridge digital and real-world with Luma integration — verify attendance and reward participants on-chain.",
    accent: "accent",
  },
  {
    icon: Coins,
    title: "Creator Tipping",
    description: "Reward creators directly for educational tasks, cultural campaigns, and engagement content with supported tokens.",
    accent: "primary",
  },
  {
    icon: Shield,
    title: "On-Chain Trust",
    description: "Stellar wallet identity, verifiable badges, completed tasks, and portable reputation anchored on the Stellar network.",
    accent: "accent",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-accent">
            Core Platform
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3">
            Everything Your Community Needs
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Games, tasks, quizzes, events, and rewards — all in one verifiable ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 group hover:border-primary/30 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  f.accent === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                <f.icon size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
