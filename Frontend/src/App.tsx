import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoutes from "./components/RouteGuards/ProtectedRoute";
import { ThemeProvider } from "./components/provider/theme-provider";
import { Suspense, lazy } from "react";

// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Problems = lazy(() => import("./pages/Problems"));
const Problem = lazy(() => import("./pages/Problem"));
const DashboardRoute = lazy(() => import("./components/RouteGuards/DashboardRoute"))
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems/:problemId" element={<Problem />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes type="protected" />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoutes type="private" />}>
              <Route path="/dashboard/*" element={<DashboardRoute />} />
              <Route path="/profile" element={<DashboardRoute />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
