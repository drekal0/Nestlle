import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { mockLeaderboard } from "@/data/mockData";

const Leaderboard = () => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">Top community contributors</p>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-4 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Rank</span>
            <span>User</span>
            <span className="text-right">XP</span>
            <span className="text-center">Level</span>
            <span className="text-center">Badges</span>
          </div>

          {mockLeaderboard.map((user, i) => {
            const isCurrent = user.id === "current";
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={isCurrent ? "/dashboard/profile" : "#"}
                  className={`grid grid-cols-[60px_1fr_100px_80px_80px] gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors ${
                    isCurrent ? "bg-primary/10 border-l-2 border-primary" : ""
                  } ${i < mockLeaderboard.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <span className={`font-display font-bold text-lg ${
                    user.rank === 1 ? "text-accent" :
                    user.rank === 2 ? "text-muted-foreground" :
                    user.rank === 3 ? "text-orange-400" : "text-muted-foreground"
                  }`}>
                    {user.rank <= 3 ? ["🥇", "🥈", "🥉"][user.rank - 1] : `#${user.rank}`}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{user.avatar}</span>
                    <span className={`font-medium ${isCurrent ? "text-primary" : ""}`}>
                      {user.name}
                    </span>
                  </div>
                  <span className="text-right font-medium">{user.xp.toLocaleString()}</span>
                  <span className="text-center text-muted-foreground">{user.level}</span>
                  <span className="text-center text-muted-foreground">{user.badges}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Leaderboard;
