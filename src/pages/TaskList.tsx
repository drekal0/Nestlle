import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useTasks } from "@/contexts/TaskContext";
import { useUser } from "@/contexts/UserContext";

type Filter = "all" | "active" | "completed";

const CATEGORIES = [
  { id: "all", label: "All Sectors" },
  { id: "gaming", label: "🎮 Gaming" },
  { id: "dev", label: "💻 Devs" },
  { id: "design", label: "✨ Design" },
  { id: "content", label: "🎬 Creators" },
  { id: "community", label: "🤝 Community" },
  { id: "general", label: "🌐 General" },
];

const TaskList = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { tasks } = useTasks();
  const { user } = useUser();

  const filtered = tasks.filter((t) => {
    const isCompleted = user.completedTaskIds.includes(t.id!);
    const taskCategory = t.category || "general";

    if (categoryFilter !== "all" && taskCategory !== categoryFilter) return false;

    if (filter === "active") return !isCompleted;
    if (filter === "completed") return isCompleted;
    return true;
  });

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Tasks</h1>
        <p className="text-muted-foreground mb-6">Complete tasks to earn XP and badges</p>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-2">
            {(["all", "active", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${categoryFilter === c.id
                  ? "bg-accent text-accent-foreground glow-gold"
                  : "glass bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
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
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${task.type === "social" ? "bg-blue-500/15 text-blue-400" :
                      task.type === "onchain" ? "bg-green-500/15 text-green-400" :
                        task.type === "educational" ? "bg-accent/15 text-accent" :
                          "bg-muted text-muted-foreground"
                      }`}>
                      {task.type}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {CATEGORIES.find(c => c.id === (task.category || "general"))?.label || "General"}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.completedTaskIds.includes(task.id!)
                    ? "bg-green-500/15 text-green-400"
                    : "bg-muted text-muted-foreground"
                    }`}>
                    {user.completedTaskIds.includes(task.id!) ? "Completed" : "Not Started"}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${task.rewardType === "badge" ? "text-accent" : "text-primary"
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
