import { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ListChecks, Trophy, User, LogOut, LayoutDashboard, PlusCircle, Settings, Gamepad2, ShieldCheck, UserCircle, Menu, X } from "lucide-react";
import WalletButton from "@/components/WalletButton";
import { useUser } from "@/contexts/UserContext";
import { useWallet } from "@/contexts/WalletContext";
import { useNavigate } from "react-router-dom";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { disconnect, isConnected } = useWallet();
  const navigate = useNavigate();
  const links = variant === "admin" ? adminLinks : userLinks;

  const handleLogout = async () => {
    await disconnect();
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/40 sticky top-0 z-50 backdrop-blur-lg">
        <Link to="/" className="font-display text-xl font-bold text-gradient-primary">
          Nestlle
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card/40 flex-col fixed top-0 left-0 h-screen z-40">
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
          {user.isAdmin && (
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
          )}
          {isConnected && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
          <div className="pt-2">
            <WalletButton variant="compact" dropdownDirection="up" />
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobileMenu} />
          <aside className="relative w-80 max-w-[80vw] bg-background border-r border-border flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <Link to="/" className="font-display text-2xl font-bold text-gradient-primary">
                  Nestlle
                </Link>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{variant} Panel</p>
              </div>
              <button onClick={closeMobileMenu} className="p-2 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={closeMobileMenu}
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

            <div className="p-4 border-t border-border space-y-3 bg-card/20">
              {user.isAdmin && (
                <Link
                  to={variant === "user" ? "/admin" : "/dashboard"}
                  onClick={closeMobileMenu}
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
              )}
              {isConnected && (
                <button
                  onClick={async () => {
                    await handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
              <div className="pt-2">
                <WalletButton variant="compact" dropdownDirection="up" />
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
