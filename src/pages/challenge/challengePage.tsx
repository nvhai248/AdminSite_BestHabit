import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
import Modal from "react-modal";
import "./challengePage.css";

const ChallengePage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(4);
  const [totalPage, setTotalPage] = useState<number>(7);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateChallenge = () => {
    // Handle the creation of the challenge here
    // You can access the input values using the state of the input fields
    closeModal();
  };

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

    setChallenges(challengeTemplateData);
  }, []);
  const clickChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main>
      <div className="header">
        <div className="left">
          <h1>Challenges</h1>
        </div>

        <div className="right">
          <div className="bx bx-plus" onClick={openModal}>
            <div className="text-on-hover">Create challenge</div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Create Challenge Modal"
            className="challenge-modal" // Add your custom modal class
            overlayClassName="challenge-overlay" // Add your custom overlay class
          >
            <h2>Create Challenge</h2>
            <form>
              <label>
                Challenge Name:
                <input type="text" name="challengeName" />
              </label>
              <label>
                Description:
                <input type="text" name="description" />
              </label>
              <label>
                Experience Point:
                <input type="text" name="exp-point" />
              </label>
              <label>
                Start Date:
                <input type="date" name="startDate" />
              </label>
              <label>
                End Date:
                <input type="date" name="endDate" />
              </label>
              <div className="buttons-container">
                <button type="button" onClick={handleCreateChallenge}>
                  Create
                </button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
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
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>User joined</th>
                <th colSpan={2}>Status</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td>{challenge.name}</td>
                  <td>{challenge.start_date}</td>
                  <td>{challenge.end_date}</td>
                  <td>{challenge.count_user_joined}</td>
                  <td>
                    <span
                      className={`status ${
                        challenge.status === true ? "deleted" : "active"
                      }`}
                    >
                      {challenge.status === true ? "deleted" : "active"}
                    </span>
                  </td>
                  <td className="challenge-action">
                    <div
                      className={`bx bx-trash ${
                        challenge.status === true ? "display-none" : ""
                      }`}
                    >
                      <div className="text-on-hover">deleted</div>
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

type Challenge = {
  id: string;
  created_at: string;
  updated_at: string;
  description: string;
  name: string;
  start_date: string;
  end_date: string;
  experience_point: number;
  count_user_joined: number;
  status: boolean;
};

const challengeTemplateData: Challenge[] = [
  {
    id: "gGzTFTGJB8Wk",
    created_at: "2023-11-29 17:10:42",
    updated_at: "2023-11-29 17:17:30",
    description: "Trong thời gian 4 tháng đạt B2",
    name: "Đổi tên lại nè",
    start_date: "2023-11-01",
    end_date: "2023-03-11",
    experience_point: 1000,
    count_user_joined: 0,
    status: false,
  },
  {
    id: "e5352HrePro4",
    created_at: "2023-11-29 17:10:18",
    updated_at: "2023-11-30 17:44:44",
    description: "Trong thời gian 3 tháng đạt B1",
    name: "Vjp pro học tiếng Nhật",
    start_date: "2023-11-29",
    end_date: "2024-02-28",
    experience_point: 1000,
    count_user_joined: 1,
    status: true,
  },
];
export default ChallengePage;
