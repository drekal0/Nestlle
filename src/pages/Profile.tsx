import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { currentUser, mockActivities, mockTasks } from "@/data/mockData";

const Profile = () => {
  const completedTasks = mockTasks.filter((t) => t.status === "completed");
  const xpPercent = (currentUser.xp / currentUser.maxXp) * 100;

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="glass rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-4xl">
              {currentUser.avatar}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{currentUser.name}</h1>
              <p className="text-muted-foreground text-sm">{currentUser.email}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sm">Level <strong className="text-primary">{currentUser.level}</strong></span>
                <span className="text-sm">Rank <strong className="text-accent">#{currentUser.rank}</strong></span>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="text-muted-foreground">{currentUser.xp} / {currentUser.maxXp}</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: "var(--gradient-primary)" }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Badges */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentUser.badges.map((badge) => (
                <div key={badge.id} className="glass rounded-xl p-4 text-center">
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="font-medium text-sm mt-2">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.earnedAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Completed Tasks</h3>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="glass rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{task.type}</p>
                  </div>
                  <span className="text-xs font-medium text-green-400">✓ Done</span>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <p className="text-muted-foreground text-sm">No completed tasks yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="mt-6">
          <h3 className="font-display text-lg font-semibold mb-4">Activity History</h3>
          <div className="glass rounded-xl p-6 space-y-4">
            {mockActivities.map((a) => (
              <div key={a.id} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm"><strong>{a.action}</strong> — {a.detail}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
                {a.xp && <span className="text-xs text-primary font-medium">+{a.xp} XP</span>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
