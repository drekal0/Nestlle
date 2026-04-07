import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Sign in with your Web3 wallet or use Web2 onboarding for an easy start.",
  },
  {
    number: "02",
    title: "Explore & Engage",
    description: "Play games, complete tasks, take quizzes, and attend IRL events.",
  },
  {
    number: "03",
    title: "Earn & Build Reputation",
    description: "Earn XP, achievement badges, and proof-of-participation NFTs.",
  },
  {
    number: "04",
    title: "Grow & Off-Ramp",
    description: "Use your portable reputation across ecosystems and convert rewards to local currency.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            Simple Flow
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3">
            How Nestlle Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <span className="font-display text-6xl font-bold text-primary/10">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-semibold mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-8 border-t border-dashed border-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
