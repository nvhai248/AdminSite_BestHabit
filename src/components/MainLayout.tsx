import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import axiosInstance from "../configs/axios.config";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarClosed, setSidebarClosed] = useState<boolean>(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [chooseMenu, setChooseMenu] = useState<string>("");
  const [infoMainUser, setInfoMainUser] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem("isDarkMode") === "true") {
      setDarkMode(true);
      document.body.classList.toggle("dark", true);
    }

    if (localStorage.getItem("menuName") != null) {
      setChooseMenu(localStorage.getItem("menuName") || "");
      navigate(`/dashboard/${chooseMenu || ""}`);
    }

    axiosInstance
      .get("users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInfoMainUser(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chooseMenu]);

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
    localStorage.setItem("menuName", menuName);
    navigate(`/dashboard/${menuName}`);
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
            className={`${chooseMenu === "" ? "active" : ""}`}
            onClick={() => handleChooseMenu("")}
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
            <p>Hello {infoMainUser == null ? "" : infoMainUser.name}</p>
            <img
              src={
                infoMainUser == null
                  ? ""
                  : infoMainUser.avatar == null
                  ? ""
                  : infoMainUser.avatar.url
              }
              alt="Profile"
            />
          </a>
        </nav>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
