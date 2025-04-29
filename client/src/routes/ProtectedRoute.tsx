import { Navigate } from "react-router-dom";
import DashboardOutlet from "../app/Dashboard/components/DashboardOutlet";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    return token ? <DashboardOutlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
