import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Users, Trophy, CheckCircle2, Heart, Award } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TipCreatorModal from "@/components/TipCreatorModal";
import ClaimBadgeModal from "@/components/ClaimBadgeModal";
import { mockTasks } from "@/data/mockData";
import { useWallet } from "@/contexts/WalletContext";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = mockTasks.find((t) => t.id === id);
  const [status, setStatus] = useState(task?.status || "not_started");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showClaimBadge, setShowClaimBadge] = useState(false);
  const { isConnected } = useWallet();

  if (!task) {
    return (
      <DashboardLayout>
        <p>Task not found.</p>
        <Link to="/dashboard/tasks" className="text-primary hover:underline">Back to Tasks</Link>
      </DashboardLayout>
    );
  }

  const handleStart = () => setStatus("in_progress");
  const handleComplete = () => {
    setStatus("completed");
    setShowSuccess(true);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate("/dashboard/tasks")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Tasks
        </button>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center max-w-lg mx-auto"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="font-display text-2xl font-bold mb-2">Task Completed!</h2>
              <p className="text-muted-foreground mb-4">You've earned your reward</p>
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold ${
                task.rewardType === "badge"
                  ? "bg-accent/15 text-accent glow-gold"
                  : "bg-primary/15 text-primary glow-primary"
              }`}>
                <Trophy size={20} />
                {task.reward}
              </div>

              {task.rewardType === "badge" && (
                <div className="mt-6">
                  <div className="glass rounded-xl p-4 inline-block mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Badge Earned</p>
                    <p className="font-display font-semibold text-accent">🏅 {task.reward}</p>
                  </div>
                  {isConnected && (
                    <div>
                      <button
                        onClick={() => setShowClaimBadge(true)}
                        className="mt-2 flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
                      >
                        <Award size={16} />
                        Claim badge on Stellar
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-4">
                <Link
                  to="/dashboard/tasks"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  View More Tasks
                </Link>
                {isConnected && (
                  <button
                    onClick={() => setShowTip(true)}
                    className="px-6 py-3 rounded-lg border border-accent/30 text-accent font-medium hover:bg-accent/10 transition-colors flex items-center gap-2"
                  >
                    <Heart size={16} />
                    Tip Creator
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="glass rounded-2xl p-8 max-w-2xl">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    task.type === "social" ? "bg-blue-500/15 text-blue-400" :
                    task.type === "onchain" ? "bg-green-500/15 text-green-400" :
                    task.type === "educational" ? "bg-accent/15 text-accent" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {task.type}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    status === "completed" ? "bg-green-500/15 text-green-400" :
                    status === "in_progress" ? "bg-primary/15 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Not Started"}
                  </span>
                </div>

                <h1 className="font-display text-2xl font-bold mb-4">{task.title}</h1>
                <p className="text-muted-foreground leading-relaxed mb-6">{task.fullDescription}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy size={16} className="text-primary" />
                    {task.reward}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={16} />
                    {task.participants} participants
                  </div>
                  {task.timeLimit && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      {task.timeLimit}
                    </div>
                  )}
                </div>

                {task.type === "onchain" && !isConnected && (
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
                    <p className="text-sm text-accent font-medium">⚠️ Stellar wallet required</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This Stellar-network task needs a connected account. Connect from the header or sidebar to proceed.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {status === "not_started" && (
                    <button
                      onClick={handleStart}
                      disabled={task.type === "onchain" && !isConnected}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Task
                    </button>
                  )}
                  {status === "in_progress" && (
                    <button
                      onClick={handleComplete}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Mark as Completed
                    </button>
                  )}
                  {status === "completed" && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 size={18} />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}

                  {isConnected && status !== "not_started" && (
                    <button
                      onClick={() => setShowTip(true)}
                      className="px-4 py-3 rounded-lg border border-accent/30 text-accent text-sm font-medium hover:bg-accent/10 transition-colors flex items-center gap-2"
                    >
                      <Heart size={16} />
                      Tip Creator
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <TipCreatorModal
        creatorName="Task Creator"
        isOpen={showTip}
        onClose={() => setShowTip(false)}
      />

      {showClaimBadge && (
        <ClaimBadgeModal
          badgeName={task.reward}
          badgeIcon="🏅"
          isOpen={showClaimBadge}
          onClose={() => setShowClaimBadge(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default TaskDetail;
