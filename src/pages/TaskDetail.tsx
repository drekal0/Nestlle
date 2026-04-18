import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Users, Trophy, CheckCircle2, Heart, Award, Gamepad2 } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TipCreatorModal from "@/components/TipCreatorModal";
import ClaimBadgeModal from "@/components/ClaimBadgeModal";
import { useTasks } from "@/contexts/TaskContext";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const CATEGORIES = [
  { id: "all", label: "All Sectors" },
  { id: "gaming", label: "🎮 Gaming" },
  { id: "dev", label: "💻 Devs" },
  { id: "design", label: "✨ Design" },
  { id: "content", label: "🎬 Creators" },
  { id: "community", label: "🤝 Community" },
  { id: "general", label: "🌐 General" },
];

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const { user, completeTask } = useUser();
  const task = tasks.find((t) => t.id === id);
  const isCurrentlyCompleted = user.completedTaskIds.includes(id!);
  const [status, setStatus] = useState(isCurrentlyCompleted ? "completed" : "not_started");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [showClaimBadge, setShowClaimBadge] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { isConnected, address } = useWallet();

  if (!task) {
    return (
      <DashboardLayout>
        <p>Task not found.</p>
        <Link to="/dashboard/tasks" className="text-primary hover:underline">Back to Tasks</Link>
      </DashboardLayout>
    );
  }

  const handleStart = () => setStatus("in_progress");

  const extractXp = (rewardStr: string) => {
    const num = parseInt(rewardStr.replace(/\D/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleComplete = () => {
    if (task) {
      completeTask(task.id, extractXp(task.reward));
    }
    setStatus("completed");
    setShowSuccess(true);
    toast.success("Task finished!");
  };

  const handleVerify = async () => {
    if (!address) return;
    setIsVerifying(true);
    try {
      const res = await fetch(`https://horizon.stellar.org/accounts/${address}/operations?limit=50&order=desc`);
      const data = await res.json();

      if (!data._embedded || !data._embedded.records) {
        toast.error("Could not fetch Stellar history.");
        setIsVerifying(false);
        return;
      }

      if (task?.type === "onchain_game") {
        const hasGameAction = data._embedded.records.some(
          (op: any) => op.type_i === 24 || op.type === "invoke_host_function"
        );
        if (hasGameAction) {
          handleComplete();
        } else {
          toast.error("No recent Web3 match activity found on this wallet.");
        }
      } else {
        const hasSwap = data._embedded.records.some(
          (op: any) => op.type === "path_payment_strict_receive" || op.type === "path_payment_strict_send"
        );

        if (hasSwap) {
          handleComplete();
        } else {
          toast.error("No recent swaps found on this wallet address.");
        }
      }
    } catch (err) {
      toast.error("Stellar network verification failed.");
    } finally {
      setIsVerifying(false);
    }
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
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold ${task.rewardType === "badge"
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
                  <div className="flex gap-2">
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
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status === "completed" ? "bg-green-500/15 text-green-400" :
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

                {(task.type === "onchain" || task.type === "onchain_game") && !isConnected && (
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
                      disabled={(task.type === "onchain" || task.type === "onchain_game") && !isConnected}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Start Task
                    </button>
                  )}
                  {status === "in_progress" && task.type !== "onchain" && task.type !== "onchain_game" && (
                    <button
                      onClick={handleComplete}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Mark as Completed
                    </button>
                  )}
                  {status === "in_progress" && task.type === "onchain" && (
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying}
                      className="px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:opacity-90 transition-opacity glow-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle2 size={18} />
                      {isVerifying ? "Verifying On-Chain..." : "Verify On-Chain"}
                    </button>
                  )}
                  {status === "in_progress" && task.type === "onchain_game" && (
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying}
                      className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity glow-gold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Gamepad2 size={18} />
                      {isVerifying ? "Verifying Play..." : "Verify Web3 Play"}
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
