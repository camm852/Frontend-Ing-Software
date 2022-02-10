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
import Providers from "../views/Providers";
import { useAuth } from "./auth-context";

export default function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/providers" element={<Providers />} />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);
  if (!auth.user) {
    return (
      <>
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  }

  return children;
}
