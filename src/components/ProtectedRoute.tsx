import { Navigate, Outlet } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";

const ProtectedRoute = () => {
    const { isConnected } = useWallet();

    if (!isConnected) {
        return <Navigate to="/login" replace />;
    }

    // Once connected, UserProvider handles loading user data and it's available via useUser()
    return <Outlet />;
};

export default ProtectedRoute;
