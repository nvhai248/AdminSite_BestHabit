import React from "react";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  return (
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
