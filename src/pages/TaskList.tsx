import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { mockTasks } from "@/data/mockData";

type Filter = "all" | "active" | "completed";

const TaskList = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = mockTasks.filter((t) => {
    if (filter === "active") return t.status !== "completed";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Tasks</h1>
        <p className="text-muted-foreground mb-6">Complete tasks to earn XP and badges</p>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/dashboard/tasks/${task.id}`}
                className="glass rounded-xl p-6 block hover:border-primary/30 transition-colors h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    task.type === "social" ? "bg-blue-500/15 text-blue-400" :
                    task.type === "onchain" ? "bg-green-500/15 text-green-400" :
                    task.type === "educational" ? "bg-accent/15 text-accent" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {task.type}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {task.status === "completed" ? "Completed" : "Not Started"}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    task.rewardType === "badge" ? "text-accent" : "text-primary"
                  }`}>
                    {task.reward}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {task.participants} participants
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default TaskList;
