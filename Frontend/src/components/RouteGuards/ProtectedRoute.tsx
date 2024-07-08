import { BACKENDURL } from "@/api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ type }: { type: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/auth/islogin`, {
          withCredentials: true,
        });
        setMounted(true);
        setIsAuth(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setMounted(true);
        setIsAuth(false);
      }
    };

    if (!mounted) {
      checkAuth();
    }
  }, [mounted]);

  if (!mounted) return null;

  if (type === "private") {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  } else if (type === "protected") {
    return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
  }

  return null;
};

export default ProtectedRoutes;
