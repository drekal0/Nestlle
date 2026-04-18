import { motion } from "framer-motion";
import { Palette, Globe, BookOpen, Users } from "lucide-react";

const initiatives = [
  { icon: Palette, label: "African Art & Storytelling" },
  { icon: Globe, label: "Local Innovation Challenges" },
  { icon: BookOpen, label: "Cultural Education Quizzes" },
  { icon: Users, label: "Community-Driven Events" },
];

const CultureSection = () => {
  return (
    <section id="culture" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              Rooted in Culture
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Advancing African{" "}
              <span className="text-gradient-gold">Creativity</span> on a Global Stage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nestlle empowers creators, educators, and communities across Africa to share their culture with a global Stellar audience — through campaigns that promote art, knowledge, heritage, and participation while earning verifiable rewards.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {initiatives.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 glass rounded-xl p-4"
                >
                  <item.icon size={20} className="text-accent shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative geometric pattern */}
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20" />
              <div className="absolute inset-4 rounded-2xl glass flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="font-display text-2xl font-bold mb-2">
                    Culture Meets Chain
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Heritage preservation through verifiable digital engagement
                  </p>
                </div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent/10 border border-accent/20 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 animate-float" style={{ animationDelay: "2s" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
