import React, { useState, useEffect } from "react";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
import "./userPage.css";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { token } = useAuth();
  const [currentName, setCurrentName] = useState<string>("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  useEffect(() => {
    setTableData(currentPage, currentName);
  }, [currentName, currentPage]);

  useEffect(() => {
    if (isSuccessModalOpen || isErrorModalOpen) {
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        setIsErrorModalOpen(false);
      }, 3000);
    }
  }, [isSuccessModalOpen, isErrorModalOpen]);

  const openSuccessModal = (message: string) => {
    setModalMessage(message);
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
    }, 3000);
  };

  const openErrorModal = (message: string) => {
    setModalMessage(message);
    setIsErrorModalOpen(true);
    setTimeout(() => {
      setIsErrorModalOpen(false);
    }, 3000);
  };

  const setTableData = (page: number, name: string) => {
    axiosInstance
      .get(`/users?page=${page}&name=${name}&limit=8`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setUsers(response.data.data);
          setCurrentPage(page);
          setTotalPage(
            Math.floor(
              response.data.paging.total / response.data.paging.limit
            ) + 1
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUser = (userId: string) => {
    axiosInstance
      .delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        openSuccessModal("Successfully deleted user!");
        setTableData(currentPage, currentName);
      })
      .catch((error) => {
        openErrorModal("Error deleting user!");
      });
  };

  const bannedUser = (userId: string) => {
    axiosInstance
      .patch(
        `/users/${userId}/banned`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        openSuccessModal("Successfully banned user!");
        setTableData(currentPage, currentName);
      })
      .catch((error) => {
        console.log(error);
        openErrorModal("Error banned user!");
      });
  };

  const unbannedUser = (userId: string) => {
    axiosInstance
      .patch(
        `/users/${userId}/unbanned`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        openSuccessModal("Successfully unbanned user!");
        setTableData(currentPage, currentName);
      })
      .catch((error) => {
        console.log(error);
        openErrorModal("Error unbanned user!");
      });
  };

  const clickChangePage = (page: number) => {
    setTableData(page, currentName);
    setCurrentPage(page);
  };
  return (
    <main>
      <div className="header">
        <div className="left">
          <h1>Users</h1>
        </div>
      </div>
      <div className="bottom-data">
        <div className="tableItems">
          <div className="header">
            <i className="bx bx-table"></i>
            <h3>List User</h3>
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
                <th>Email</th>
                <th>Task Count</th>
                <th>Habit Count</th>
                <th>Challenge Count</th>
                <th colSpan={2}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.avatar && <img src={user.avatar.url} alt="User" />}
                    <p>{user.name}</p>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.task_count}</td>
                  <td>{user.habit_count}</td>
                  <td>{user.challenge_count}</td>
                  <td>
                    <span
                      className={`status ${
                        user.status === -1
                          ? "banned"
                          : user.status === 0
                          ? "deleted"
                          : user.status === -2
                          ? "not-verified"
                          : "active"
                      }`}
                    >
                      {user.status === -1
                        ? "banned"
                        : user.status === 0
                        ? "deleted"
                        : user.status === -2
                        ? "not verified"
                        : "active"}
                    </span>
                  </td>
                  <td className="user-action">
                    <div
                      className={`bx bx-trash ${
                        user.status === 0 ? "display-none" : ""
                      }`}
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      <div className="text-on-hover">deleted</div>
                    </div>
                    <div
                      className={`bx bx-lock-alt ${
                        user.status === -1 || user.status === 0
                          ? "display-none"
                          : ""
                      }`}
                      onClick={() => {
                        bannedUser(user.id);
                      }}
                    >
                      <div className="text-on-hover">banned</div>
                    </div>
                    <div
                      className={`bx bx-lock-open-alt ${
                        user.status === 1 ||
                        user.status === 0 ||
                        user.status === -2
                          ? "display-none"
                          : ""
                      }`}
                      onClick={() => {
                        unbannedUser(user.id);
                      }}
                    >
                      <div className="text-on-hover">unbanned</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <ul>
              <li
                className={`bx bx-chevron-left ${
                  currentPage === 1 ? "visibility-hidden" : ""
                }`}
                onClick={() => {
                  clickChangePage(currentPage - 1);
                }}
              ></li>
              <li>{currentPage - 2 > 1 ? "..." : ""}</li>
              <li
                onClick={() => {
                  clickChangePage(currentPage - 2);
                }}
              >
                {currentPage - 2 > 0 ? currentPage - 2 : ""}
              </li>
              <li
                onClick={() => {
                  clickChangePage(currentPage - 1);
                }}
              >
                {currentPage - 1 > 0 ? currentPage - 1 : ""}
              </li>
              <li className="current">{currentPage}</li>
              <li
                onClick={() => {
                  clickChangePage(currentPage + 1);
                }}
              >
                {totalPage - currentPage >= 1 ? currentPage + 1 : ""}
              </li>
              <li
                onClick={() => {
                  clickChangePage(currentPage + 2);
                }}
              >
                {totalPage - currentPage >= 2 ? currentPage + 2 : ""}
              </li>
              <li>{totalPage - currentPage > 2 ? "..." : ""}</li>
              <li
                className={`bx bx-chevron-right ${
                  currentPage === totalPage ? "visibility-hidden" : ""
                }`}
                onClick={() => {
                  clickChangePage(currentPage + 1);
                }}
              ></li>
            </ul>
          </table>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className={`success-modal show`}>{modalMessage}</div>
      )}

      {isErrorModalOpen && (
        <div className={`error-modal show`}>{modalMessage}</div>
      )}
    </main>
  );
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: number;
  experience: number;
  settings: any;
  role: string;
  created_at: string;
  updated_at: string;
  avatar?: any | null;
  task_count: number;
  habit_count: number;
  challenge_count: number;
  status: number;
};

export default UserPage;
