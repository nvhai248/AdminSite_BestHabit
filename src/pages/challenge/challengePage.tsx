import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";

const ChallengePage: React.FC = () => {
  const [users, setUsers] = useState<any>({});
  const { token } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/challenges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <div className="header">
        <div className="left">
          <h1>Challenges</h1>
        </div>
      </div>
      <div className="bottom-data">
        <div className="tableItems">
          <div className="header">
            <i className="bx bx-table"></i>
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
    </main>
  );
};

export default ChallengePage;
