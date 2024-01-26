import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import { useAuth } from "./provider/authContext";
import UserPage from "./pages/user/userPage";
import ChallengePage from "./pages/challenge/challengePage";
import MainLayout from "./components/MainLayout";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <MainLayout /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserPage />} />
          <Route path="challenges" element={<ChallengePage />} />
        </Route>
        {/* Add a catch-all route for unknown paths */}
        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
