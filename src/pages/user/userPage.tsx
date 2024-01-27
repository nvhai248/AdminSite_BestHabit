import React from "react";

const UserPage: React.FC = () => {
  return (
    <main>
      <div className="header">
        <div className="left">
          <h1>Users</h1>
        </div>
      </div>
      <div className="bottom-data">
        <RecentOrders />
      </div>
    </main>
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

export default UserPage;
