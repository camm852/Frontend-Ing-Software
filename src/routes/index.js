import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Dashboard from "../views/Dashobard";
import Profile from "../views/Profile";
import Users from "../views/Users/index";
import Shoes from "../views/Shoes";
import Suppliers from "../views/Suppliers";
import { useAuth } from "./auth-context";

export default function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Users />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/shoes"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Shoes />
              </RequireAdmin>
            </RequireAuth>
          }
        />
        <Route
          path="/suppliers"
          element={
            <RequireAuth>
              <RequireAdmin>
                <Suppliers />
              </RequireAdmin>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return (
      <>
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  }

  return children;
}

function RequireAdmin({ children }) {
  const auth = useAuth();
  console.log(auth.user.roleCode);
  const location = useLocation();
  if (auth.user.roleCode !== 2) {
    return (
      <>
        <Navigate to="/profile" state={{ from: location }} replace />
      </>
    );
  }
  return children;
}
