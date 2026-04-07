import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { currentUser, mockTasks, mockActivities } from "@/data/mockData";

const Dashboard = () => {
  const featuredTasks = mockTasks.filter((t) => t.status !== "completed").slice(0, 3);
  const xpPercent = (currentUser.xp / currentUser.maxXp) * 100;

  return (
    <DashboardLayout>
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold">
          Welcome back, <span className="text-gradient-primary">{currentUser.name}</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here's your engagement overview</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Level", value: currentUser.level, icon: "⚡" },
          { label: "Total XP", value: currentUser.xp.toLocaleString(), icon: "✨" },
          { label: "Badges", value: currentUser.badges.length, icon: "🏅" },
          { label: "Rank", value: `#${currentUser.rank}`, icon: "🏆" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* XP Progress */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">XP Progress</h3>
          <span className="text-sm text-muted-foreground">
            {currentUser.xp} / {currentUser.maxXp} XP to Level {currentUser.level + 1}
          </span>
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Featured Tasks */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Featured Tasks</h3>
            <Link
              to="/dashboard/tasks"
              className="text-sm text-primary hover:underline"
            >
              View All Tasks
            </Link>
          </div>
          <div className="space-y-3">
            {featuredTasks.map((task) => (
              <Link
                key={task.id}
                to={`/dashboard/tasks/${task.id}`}
                className="glass rounded-xl p-5 flex items-center justify-between hover:border-primary/30 transition-colors block"
              >
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ml-4 ${
                  task.rewardType === "badge"
                    ? "bg-accent/15 text-accent"
                    : "bg-primary/15 text-primary"
                }`}>
                  {task.reward}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="glass rounded-xl p-5 space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
                {activity.xp && (
                  <span className="text-xs text-primary font-medium ml-auto">+{activity.xp} XP</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
