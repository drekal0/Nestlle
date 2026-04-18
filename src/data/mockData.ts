export interface Task {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  reward: string;
  rewardType: "xp" | "badge";
  status: "not_started" | "in_progress" | "completed";
  type: "social" | "onchain" | "onchain_game" | "educational" | "custom";
  category?: "gaming" | "dev" | "design" | "content" | "community" | "general";
  participants: number;
  timeLimit?: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  badges: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
}

export interface Activity {
  id: string;
  action: string;
  detail: string;
  time: string;
  xp?: number;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow Nestlle on Twitter",
    description: "Follow our official Twitter account and retweet the pinned post.",
    fullDescription: "Follow @nestlle on Twitter and retweet the pinned announcement post. Make sure your account is public so we can verify. This helps spread awareness about the platform and earns you XP towards your engagement score.",
    reward: "50 XP",
    rewardType: "xp",
    status: "not_started",
    type: "social",
    category: "general",
    participants: 342,
    timeLimit: "7 days",
  },
  {
    id: "2",
    title: "Complete Stellar Basics Quiz",
    description: "Test your knowledge of the Stellar network and wallets.",
    fullDescription: "Take a 10-question quiz covering Stellar fundamentals: accounts, trustlines, assets, consensus (SCP), and safe wallet practices. Score 80% or higher to earn the Knowledge Badge. You can retake the quiz up to 3 times.",
    reward: "Knowledge Badge",
    rewardType: "badge",
    status: "not_started",
    type: "educational",
    category: "dev",
    participants: 189,
  },
  {
    id: "3",
    title: "Swap on a Stellar DEX",
    description: "Perform an asset swap on a Stellar decentralized exchange.",
    fullDescription: "Use your Stellar wallet to perform any legitimate swap on a Stellar DEX (e.g. liquidity pool or order book UI). The transaction will be verified on the public network. Minimum notional value: $1 equivalent. This task shows you can move value on Stellar.",
    reward: "100 XP",
    rewardType: "xp",
    status: "not_started",
    type: "onchain",
    category: "community",
    participants: 98,
    timeLimit: "14 days",
  },
  {
    id: "4",
    title: "Join Discord Community",
    description: "Join our Discord server and introduce yourself in #introductions.",
    fullDescription: "Join the Nestlle Discord server using the invite link provided. Post a brief introduction in the #introductions channel including your interests in Stellar or community tasks. React to at least 3 posts in any channel to complete the task.",
    reward: "30 XP",
    rewardType: "xp",
    status: "completed",
    type: "social",
    category: "gaming",
    participants: 567,
  },
  {
    id: "5",
    title: "African Heritage Quiz",
    description: "Learn about African art, history, and cultural heritage.",
    fullDescription: "Explore African cultural heritage through an interactive quiz covering traditional art forms, historical kingdoms, and modern African innovation. This quiz celebrates the rich diversity of African cultures and rewards your curiosity.",
    reward: "Culture Badge",
    rewardType: "badge",
    status: "completed",
    type: "educational",
    category: "general",
    participants: 234,
  },
  {
    id: "6",
    title: "Create a Community Post",
    description: "Share your Stellar journey or a creative piece with the community.",
    fullDescription: "Create an original post sharing your Stellar journey, a piece of digital art, or a creative writing piece related to community or culture on chain. Posts will be reviewed by moderators. Quality submissions may be featured on the platform.",
    reward: "75 XP",
    rewardType: "xp",
    status: "not_started",
    type: "custom",
    category: "content",
    participants: 156,
    timeLimit: "30 days",
  },
];

export const mockLeaderboard: LeaderboardUser[] = [
  { id: "u1", rank: 1, name: "CryptoNomad", avatar: "🦁", xp: 4520, level: 12, badges: 8 },
  { id: "u2", rank: 2, name: "StellarBee", avatar: "🐝", xp: 4100, level: 11, badges: 7 },
  { id: "u3", rank: 3, name: "LumenLegend", avatar: "⚔️", xp: 3800, level: 10, badges: 6 },
  { id: "u4", rank: 4, name: "PoolPioneer", avatar: "💎", xp: 3450, level: 9, badges: 6 },
  { id: "u5", rank: 5, name: "BadgeBandit", avatar: "🥷", xp: 3200, level: 9, badges: 5 },
  { id: "u6", rank: 6, name: "TokenTiger", avatar: "🐯", xp: 2900, level: 8, badges: 5 },
  { id: "u7", rank: 7, name: "ChainChamp", avatar: "🏆", xp: 2650, level: 7, badges: 4 },
  { id: "current", rank: 8, name: "You", avatar: "🚀", xp: 2400, level: 7, badges: 4 },
  { id: "u9", rank: 9, name: "MetaMaster", avatar: "🧙", xp: 2100, level: 6, badges: 3 },
  { id: "u10", rank: 10, name: "SorobanStar", avatar: "🦅", xp: 1800, level: 5, badges: 3 },
];

export const mockBadges: Badge[] = [
  { id: "b1", name: "Early Adopter", icon: "🌟", earnedAt: "2026-01-15" },
  { id: "b2", name: "Quiz Master", icon: "🧠", earnedAt: "2026-02-20" },
  { id: "b3", name: "Social Butterfly", icon: "🦋", earnedAt: "2026-03-01" },
  { id: "b4", name: "Culture Explorer", icon: "🌍", earnedAt: "2026-03-15" },
];

export const mockActivities: Activity[] = [
  { id: "a1", action: "Completed Task", detail: "Join Discord Community", time: "2 hours ago", xp: 30 },
  { id: "a2", action: "Earned Badge", detail: "Culture Explorer", time: "1 day ago" },
  { id: "a3", action: "Completed Quiz", detail: "African Heritage Quiz", time: "2 days ago", xp: 50 },
  { id: "a4", action: "Leveled Up", detail: "Reached Level 7", time: "3 days ago" },
  { id: "a5", action: "Started Task", detail: "Follow Nestlle on Twitter", time: "4 days ago" },
];

export const currentUser = {
  name: "Alex Okafor",
  email: "alex@example.com",
  avatar: "🚀",
  level: 7,
  xp: 2400,
  maxXp: 3000,
  badges: mockBadges,
  completedTasks: 12,
  rank: 8,
};

export const adminStats = {
  totalUsers: 1247,
  tasksCreated: 34,
  completionRate: 67,
  activeUsers: 892,
  totalXpDistributed: 156000,
};
