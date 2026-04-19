import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { adminStats } from "@/data/mockData";
import { useTasks } from "@/contexts/TaskContext";

const AdminDashboard = () => {
  const { tasks } = useTasks();

  const stats = [
    { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: "👥" },
    { label: "Tasks Created", value: adminStats.tasksCreated, icon: "📋" },
    { label: "Completion Rate", value: `${adminStats.completionRate}%`, icon: "📈" },
    { label: "Active Users", value: adminStats.activeUsers.toLocaleString(), icon: "🔥" },
  ];

  const recentTasks = tasks.slice(0, 4);

  return (
    <DashboardLayout variant="admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Overview of your community engagement</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <p className="font-display text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/admin/create-task"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary text-center"
          >
            + Create New Task
          </Link>
          <Link
            to="/admin/manage-tasks"
            className="px-6 py-3 rounded-lg glass text-foreground font-medium hover:bg-muted transition-colors text-center"
          >
            Manage Tasks
          </Link>
        </div>

        {/* Recent Tasks */}
        <h3 className="font-display text-lg font-semibold mb-4">Recent Tasks</h3>
        <div className="glass rounded-2xl overflow-hidden">
          {recentTasks.map((task, i) => (
            <Link
              key={task.id}
              to={`/admin/manage-tasks`}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-3 ${i < recentTasks.length - 1 ? "border-b border-border/50" : ""
                }`}
            >
              <div>
                <p className="font-medium text-base">{task.title}</p>
                <p className="text-sm text-muted-foreground capitalize">{task.type} task</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium">{task.participants} participants</p>
                <p className="text-xs text-muted-foreground">{task.reward}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
