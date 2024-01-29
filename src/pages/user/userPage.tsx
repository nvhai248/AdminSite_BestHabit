import React, { useState, useEffect } from "react";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
import "./userPage.css";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(4);
  const [totalPage, setTotalPage] = useState<number>(7);
  const { token } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/users", {
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

    setUsers(userTemplateData);
  }, []);

  const clickChangePage = (page: number) => {
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
                    >
                      <div className="text-on-hover">deleted</div>
                    </div>
                    <div
                      className={`bx bx-lock-alt ${
                        user.status === -1 || user.status === 0
                          ? "display-none"
                          : ""
                      }`}
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
                  currentPage == 1 ? "visibility-hidden" : ""
                }`}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
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
                  currentPage == totalPage ? "visibility-hidden" : ""
                }`}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              ></li>
            </ul>
          </table>
        </div>
      </div>
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

const userTemplateData: User[] = [
  {
    id: "3w5rMJ7r2JjRwN",
    email: "lehai19022002@gmail.com",
    created_at: "2023-12-20 23:28:35",
    updated_at: "2024-01-28 11:23:04",
    phone: "0111111112",
    name: "Lê Nguyên Sinh",
    avatar: {
      id: 0,
      url: "https://avatars.githubusercontent.com/u/74849616?v=4",
      width: 0,
      height: 0,
      cloud_name: "s3",
      extension: ".png",
    },
    level: 1,
    experience: 0,
    settings: {
      theme: "light",
      language: "en",
    },
    role: "user",
    habit_count: 2,
    task_count: 2,
    challenge_count: 0,
    status: 0,
  },
  {
    id: "3w4MYPFc9KonuA",
    created_at: "2023-12-20 23:28:35",
    updated_at: "2024-01-28 11:23:04",
    email: "congacon3122@gmail.com",
    phone: "",
    name: "Hải Nguyễn",
    avatar: {
      id: 0,
      url: "https://lh3.googleusercontent.com/a/ACg8ocJ-wuyyVR6d-r5sJUIgqUNJjXXNJ6bbtPlQW9EKsw8l=s96-c",
      width: 0,
      height: 0,
      cloud_name: "Google",
    },
    level: 1,
    experience: 0,
    settings: null,
    role: "user",
    habit_count: 0,
    task_count: 0,
    challenge_count: 0,
    status: -1,
  },
  {
    id: "3pf1vULa2NmdGk",
    created_at: "2023-12-05 23:18:58",
    updated_at: "2024-01-28 11:24:36",
    email: "lnsss@gmail.com",
    phone: "0111111112",
    name: "Lê Nguyên Sinh",
    avatar: {
      id: 0,
      url: "https://avatars.githubusercontent.com/u/74849616?v=4",
      width: 0,
      height: 0,
      cloud_name: "s3",
      extension: ".png",
    },
    level: 1,
    experience: 0,
    settings: {
      theme: "light",
      language: "en",
    },
    role: "user",
    habit_count: 0,
    task_count: 0,
    challenge_count: 0,
    status: -2,
  },
  {
    id: "3pbKABFePC7xDe",
    created_at: "2023-11-20 17:38:30",
    updated_at: "2024-01-28 11:24:36",
    email: "lh@gmail.com",
    phone: "08130111111",
    name: "Hoàng Văn Thất",
    avatar: {
      id: 0,
      url: "https://avatars.githubusercontent.com/u/74849616?v=4",
      width: 0,
      height: 0,
      cloud_name: "s3",
      extension: ".png",
    },
    level: 1,
    experience: 0,
    settings: {
      theme: "dark",
      language: "en",
    },
    role: "user",
    habit_count: 6,
    task_count: 4,
    challenge_count: 1,
    status: 1,
  },
  {
    id: "3mMo3hVGTE4VTN",
    created_at: "2023-11-16 12:31:54",
    updated_at: "2024-01-28 11:23:04",
    email: "nvhai2408@gmail.com",
    phone: "",
    name: "Nguyễn Văn Hải",
    level: 1,
    experience: 0,
    settings: {
      theme: "light",
      language: "en",
    },
    avatar: {
      id: 0,
      url: "https://avatars.githubusercontent.com/u/74849616?v=4",
      width: 0,
      height: 0,
      cloud_name: "s3",
      extension: ".png",
    },
    role: "user",
    habit_count: 0,
    task_count: 4,
    challenge_count: 0,
    status: 1,
  },
];

export default UserPage;
