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

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Dashboard /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
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
