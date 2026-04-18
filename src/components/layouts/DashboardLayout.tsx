import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ListChecks, Trophy, User, LogOut, LayoutDashboard, PlusCircle, Settings, Gamepad2, ShieldCheck, UserCircle } from "lucide-react";
import WalletButton from "@/components/WalletButton";

const userLinks = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Games", href: "/dashboard/games", icon: Gamepad2 },
  { label: "Tasks", href: "/dashboard/tasks", icon: ListChecks },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Cash Out", href: "/dashboard/cashout", icon: LogOut },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Create Task", href: "/admin/create-task", icon: PlusCircle },
  { label: "Manage Tasks", href: "/admin/manage-tasks", icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
  variant?: "user" | "admin";
}

const DashboardLayout = ({ children, variant = "user" }: DashboardLayoutProps) => {
  const location = useLocation();
  const links = variant === "admin" ? adminLinks : userLinks;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/40 flex flex-col fixed top-0 left-0 h-screen z-40">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-display text-2xl font-bold text-gradient-primary">
            Nestlle
          </Link>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{variant} Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Role Switcher & Wallet */}
        <div className="p-4 border-t border-border space-y-3">
          <Link
            to={variant === "user" ? "/admin" : "/dashboard"}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors w-full"
          >
            {variant === "user" ? (
              <>
                <ShieldCheck size={18} />
                Switch to Admin
              </>
            ) : (
              <>
                <UserCircle size={18} />
                Switch to User
              </>
            )}
          </Link>
          <div className="pt-2">
            <WalletButton variant="compact" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
