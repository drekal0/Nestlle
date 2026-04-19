import { motion } from "framer-motion";
import { Gamepad2, ExternalLink, Play, Search } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Mock SGS Web3 games catalog
const mockWeb3Games = [
    {
        id: "g1",
        title: "Stellar Asteroids",
        author: "SGS Web3 Team",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
        tags: ["Action", "Arcade"],
        url: "https://jamesbachini.github.io/Stellar-Game-Studio/",
        players: 320
    },
    {
        id: "g2",
        title: "Soroban Chess",
        author: "TacticsDAO",
        image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&h=400&fit=crop",
        tags: ["Strategy", "Board"],
        url: "https://jamesbachini.github.io/Stellar-Game-Studio/",
        players: 84
    },
    {
        id: "g3",
        title: "Crypto Racers",
        author: "0xMotors",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
        tags: ["Racing", "PVP"],
        url: "https://jamesbachini.github.io/Stellar-Game-Studio/",
        players: 156
    },
    {
        
        id: "g4",
        title: "Rock Paper Scissors",
        author: "Nestlle Web3 Team",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
        tags: ["Action", "Arcade"],
        url: "https://rock-paper-scissors-web-ten.vercel.app//",
        players: 320
    },
];

const Games = () => {
    return (
        <DashboardLayout>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold mb-2">Web3 Games</h1>
                        <p className="text-muted-foreground">Play verified Stellar Game Studio matches and earn rewards.</p>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search games..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWeb3Games.map((game, i) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-4">
                                    <div className="flex gap-2">
                                        {game.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-white">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">{game.title}</h3>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                        <Gamepad2 size={12} />
                                        {game.players} online
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-6">By {game.author}</p>

                                <div className="mt-auto">
                                    <a
                                        href={game.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary"
                                    >
                                        <Play size={16} className="fill-current" />
                                        Play Now
                                        <ExternalLink size={14} className="ml-1 opacity-70" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default Games;
