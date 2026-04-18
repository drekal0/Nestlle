import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/contexts/WalletContext";
import { UserProvider } from "@/contexts/UserContext";
import { TaskProvider } from "@/contexts/TaskContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTask from "./pages/CreateTask";
import ManageTasks from "./pages/ManageTasks";

const App = () => (
  <WalletProvider>
    <UserProvider>
      <TaskProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/games" element={<Games />} />
                <Route path="/dashboard/tasks" element={<TaskList />} />
                <Route path="/dashboard/tasks/:id" element={<TaskDetail />} />
                <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/create-task" element={<CreateTask />} />
                <Route path="/admin/manage-tasks" element={<ManageTasks />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TaskProvider>
    </UserProvider>
  </WalletProvider>
);

export default App;
