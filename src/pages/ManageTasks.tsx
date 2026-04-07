import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { mockTasks } from "@/data/mockData";

const ManageTasks = () => {
  return (
    <DashboardLayout variant="admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Manage Tasks</h1>
            <p className="text-muted-foreground">View and manage all engagement tasks</p>
          </div>
          <Link
            to="/admin/create-task"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            + New Task
          </Link>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_120px_120px_100px] gap-4 px-6 py-4 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Task</span>
            <span className="text-center">Participants</span>
            <span className="text-center">Status</span>
            <span className="text-center">Reward</span>
          </div>

          {mockTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/dashboard/tasks/${task.id}`}
                className={`grid grid-cols-[1fr_120px_120px_100px] gap-4 px-6 py-5 items-center hover:bg-muted/30 transition-colors ${
                  i < mockTasks.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">{task.type}</p>
                </div>
                <p className="text-center text-sm">{task.participants}</p>
                <div className="flex justify-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-primary/15 text-primary"
                  }`}>
                    {task.status === "completed" ? "Completed" : "Active"}
                  </span>
                </div>
                <p className="text-center text-sm">{task.reward}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ManageTasks;
