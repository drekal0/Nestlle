import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, Copy, Check, ExternalLink, Link2, Edit2, Save } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ClaimBadgeModal from "@/components/ClaimBadgeModal";
import { mockActivities, currentUser as mockUser } from "@/data/mockData";
import { useTasks } from "@/contexts/TaskContext";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";
import StellarKitConnectButton from "@/components/StellarKitConnectButton";

const Profile = () => {
  const { tasks } = useTasks();
  const { user, updateProfile } = useUser();
  const completedTasks = tasks.filter((t) => user.completedTaskIds.includes(t.id!));
  const { isConnected, address, balance, shortenAddress, disconnect } = useWallet();

  const [copied, setCopied] = useState(false);
  const [claimBadge, setClaimBadge] = useState<{ name: string; icon: string } | null>(null);

  const [isEditing, setIsEditing] = useState(!user.isProfileComplete);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  // Sync state if user changes externally
  useEffect(() => {
    setIsEditing(!user.isProfileComplete);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAvatar(user.avatar);
  }, [user]);

  const handleSaveProfile = () => {
    updateProfile({
      name: editName,
      email: editEmail,
      avatar: editAvatar,
      isProfileComplete: true,
    });
    setIsEditing(false);
  };

  const xpPercent = (mockUser.xp / mockUser.maxXp) * 100;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="glass rounded-2xl p-8 mb-6 relative">
          {isConnected && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <Edit2 size={18} />
            </button>
          )}

          {isEditing ? (
            <div className="space-y-4 max-w-md">
              <h2 className="font-display text-xl font-bold mb-4">Complete your Profile</h2>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Avatar (Emoji)</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-20 px-4 py-2 text-center text-2xl rounded-lg bg-muted border border-border text-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity mt-4"
              >
                <Save size={16} />
                Save Profile
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-4xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm">Level <strong className="text-primary">{mockUser.level}</strong></span>
                  <span className="text-sm">Rank <strong className="text-accent">#{mockUser.rank}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* XP Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="text-muted-foreground">{mockUser.xp} / {mockUser.maxXp}</span>
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

        {/* Wallet Section */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Wallet size={20} className="text-primary" />
            <h3 className="font-display text-lg font-semibold">Wallet</h3>
          </div>

          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Connected Address</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{shortenAddress(address)}</span>
                    <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={`https://stellar.expert/explorer/public/account/${address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Balance</p>
                  <p className="font-display font-bold">{balance} XLM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={disconnect}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Link2 size={28} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Link your Stellar wallet to claim badges, tip creators, and verify Stellar-network tasks
              </p>
              <div className="mx-auto max-w-xs rounded-xl border border-primary/30 bg-muted/20 p-3 [&_button]:max-w-full">
                <StellarKitConnectButton className="flex w-full justify-center" />
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Badges */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {mockUser.badges.map((badge) => (
                <div key={badge.id} className="glass rounded-xl p-4 text-center group relative">
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="font-medium text-sm mt-2">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.earnedAt}</p>
                  {isConnected && (
                    <button
                      onClick={() => setClaimBadge({ name: badge.name, icon: badge.icon })}
                      className="mt-2 text-xs text-primary hover:underline font-medium"
                    >
                      Claim badge
                    </button>
                  )}
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

      {claimBadge && (
        <ClaimBadgeModal
          badgeName={claimBadge.name}
          badgeIcon={claimBadge.icon}
          isOpen={!!claimBadge}
          onClose={() => setClaimBadge(null)}
        />
      )}
    </DashboardLayout>
  );
};

export default Profile;
