import { motion } from "framer-motion";
import { Coins, BookOpen, Palette, Gamepad2 } from "lucide-react";

const creatorTypes = [
  { icon: BookOpen, title: "Educational Tasks", description: "Create learning content and quizzes that reward participants with knowledge badges." },
  { icon: Palette, title: "Creative Campaigns", description: "Launch cultural and artistic campaigns that engage global Web3 audiences." },
  { icon: Gamepad2, title: "Games & Challenges", description: "Design mini-games and community challenges that drive engagement." },
  { icon: Coins, title: "Earn Tips", description: "Receive direct tips from participants and sponsors in supported tokens." },
];

const CreatorSection = () => {
  return (
    <section id="creators" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-accent">Creator Economy</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3">
            Build, Engage, <span className="text-gradient-gold">Earn</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Creators design tasks, quizzes, and campaigns — and get tipped directly by their community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creatorTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-accent/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="font-display font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorSection;
