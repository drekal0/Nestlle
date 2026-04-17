import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const CreateTask = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [rewardType, setRewardType] = useState("xp");
  const [taskType, setTaskType] = useState("social");
  const [timeLimit, setTimeLimit] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/admin/manage-tasks");
  };

  return (
    <DashboardLayout variant="admin">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-2">Create Task</h1>
        <p className="text-muted-foreground mb-8">Design a new engagement task for your community</p>

        <div className="glass rounded-2xl p-8 max-w-2xl">
          <form onSubmit={handlePublish} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Follow us on Twitter"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what participants need to do..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Reward</label>
                <input
                  type="text"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="e.g. 50 XP or Badge Name"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Reward Type</label>
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="xp">XP</option>
                  <option value="badge">Badge</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Task Type</label>
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                >
                  <option value="social">Social</option>
                  <option value="onchain">Stellar on-chain</option>
                  <option value="educational">Educational</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Time Limit</label>
                <input
                  type="text"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  placeholder="e.g. 7 days"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
              >
                Publish Task
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-8 py-3 rounded-lg glass text-foreground font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CreateTask;
