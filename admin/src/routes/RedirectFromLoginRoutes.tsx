import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "../pages";
import { FrontendRoutes } from "../constants";

export const ProtectedLoginPage = () => {
    const { data: authData } = useAuth();
  
    if (authData) {
      return <Navigate to={FrontendRoutes.HOME} replace />;
    }
  
    return <LoginPage />;
  };