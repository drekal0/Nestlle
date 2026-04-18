import { Navigate, Outlet } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { useUser } from "@/contexts/UserContext";

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
    const { isConnected } = useWallet();
    const { isAdmin } = useUser();

    if (!isConnected) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
