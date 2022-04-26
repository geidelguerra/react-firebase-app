import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/auth";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import GatewaysPage from "./pages/Gateways";
import ForgotPasswordPage from "./pages/ForgotPassword";

export default function App() {
  return (
    <AuthProvider>
      <div className="font-sans flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-1 flex m-4">
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
              <Route path="/gateways" element={<RequireAuth><GatewaysPage /></RequireAuth>} />
            </Routes>
          </main>
        </Router>

        <footer>
          Geidel Guerra &copy; 2022. All Rights Reserved
        </footer>
      </div>
    </AuthProvider>
  );
}

function Navbar() {
  const auth = useAuth();

  if (auth.user) {
    return (
      <header className="flex items-center p-4 shadow-md rounded-lg m-4 border border-gray-200">
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/" className="hover:underline underline-offset-2 font-bold text-gray-600">Home</NavLink>
          </li>
          <li>
            <NavLink to="/gateways" className="hover:underline underline-offset-2 font-bold text-gray-600">Gateways</NavLink>
          </li>
        </ul>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <div className="font-bold text-gray-600">{auth.user.email}</div>
          <button
            className="border border-blue-500 bg-blue-500 px-4 py-3 rounded font-bold text-xs text-white uppercase hover:border-blue-600 transition-all duration-200"
            onClick={() => auth.signOut()}
          >
            Sign out
          </button>
        </div>
      </header>
    )
  }

  return null
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children
}