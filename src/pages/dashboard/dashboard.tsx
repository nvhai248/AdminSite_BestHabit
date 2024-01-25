import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/authContext";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const [isSidebarClosed, setSidebarClosed] = useState<boolean>(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [chooseMenu, setChooseMenu] = useState<string>("dashboard");

  useEffect(() => {
    if (localStorage.getItem("isDarkMode") === "true") {
      setDarkMode(true);
      document.body.classList.toggle("dark", true);
    }
  }, []);

  const handleSidebarToggle = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark", newDarkMode);
    localStorage.setItem("isDarkMode", newDarkMode.toString());
  };

  const handleChooseMenu = (menuName: string) => {
    setChooseMenu(menuName);
  };
  const { token, logout } = useAuth();
  return (
    <div>
      {/* SIDE BAR */}
      <div className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
        <a className="logo">
          <i className="bx bx-code-alt"></i>
          <div className="logo-name">
            <span>Best</span>Habit
          </div>
        </a>
        <ul className="side-menu">
          <li
            className={`${chooseMenu === "dashboard" ? "active" : ""}`}
            onClick={() => handleChooseMenu("dashboard")}
          >
            <a>
              <i className="bx bxs-dashboard"></i>Dashboard
            </a>
          </li>
          <li
            className={`${chooseMenu === "challenges" ? "active" : ""}`}
            onClick={() => handleChooseMenu("challenges")}
          >
            <a>
              <i className="bx bx-message-square-dots"></i>Challenges
            </a>
          </li>
          <li
            className={`${chooseMenu === "users" ? "active" : ""}`}
            onClick={() => handleChooseMenu("users")}
          >
            <a>
              <i className="bx bx-group"></i>Users
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a className="logout" onClick={logout}>
              <i className="bx bx-log-out-circle"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        {/* NAV BAR */}
        <nav>
          <i className="bx bx-menu" onClick={handleSidebarToggle}></i>
          <label
            htmlFor="theme-toggle"
            className={`bx ${isDarkMode ? "bx-moon" : "bx-sun"}`}
            onClick={handleThemeToggle}
          ></label>
          <a className="profile">
            <img src="icon.png" alt="Profile" />
          </a>
        </nav>
        <div className="main-content">
          <main>
            <div className="header">
              <div className="left">
                <h1>Dashboard</h1>
              </div>
            </div>
            <Insights />
            <div className="bottom-data">
              <RecentOrders />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const Insights: React.FC = () => {
  return (
    <ul className="insights">
      <ul className="insights">
        <li>
          <i className="bx bx-calendar-check"></i>
          <span className="info">
            <h3>1,074</h3>
            <p>Tasks</p>
          </span>
        </li>
      </ul>
    </ul>
  );
};

const RecentOrders: React.FC = () => {
  return (
    <div className="orders">
      <div className="orders">
        <div className="header">
          <i className="bx bx-receipt"></i>
          <h3>Recent Orders</h3>
          <i className="bx bx-filter"></i>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button className="search-btn" type="submit">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="images/profile-1.jpg" alt="User" />
                <p>John Doe</p>
              </td>
              <td>14-08-2023</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
