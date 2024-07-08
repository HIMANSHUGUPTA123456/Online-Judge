import { BACKENDURL } from "@/api/api";
import DashboardAdmin from "@/pages/DashboardAdmin";
import DashboardUser from "@/pages/DashboardUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardRoute = () => {
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/auth/islogin`, {
          withCredentials: true,
        });
        //console.log("[response]", response);
        setMounted(true);
        if (response.data.isAuthenticated) {
          setIsAdmin(response.data.user.isAdmin);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setMounted(true);
      }
    };
    if (!mounted) {
      checkAuth();
    }
  }, []);

  if (!mounted) return null;

  /* if (!isAuth) {
    return <Navigate to="/login" />;
  }*/

  return (
    <Routes>
      {isAdmin ? (
        <Route path="/" element={<DashboardAdmin />} />
      ) : (
        <Route path="/" element={<DashboardUser />} />
      )}
    </Routes>
  );
};

export default DashboardRoute;
