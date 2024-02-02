import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
import Modal from "react-modal";
import "./challengePage.css";

const ChallengePage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  useEffect(() => {
    setTableData(currentPage, currentName);
  }, [currentPage, currentName]);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateChallenge = () => {
    const challengeName = (
      document.querySelector('input[name="challengeName"]') as HTMLInputElement
    ).value;
    const description = (
      document.querySelector('input[name="description"]') as HTMLInputElement
    ).value;
    const expPoint = (
      document.querySelector('input[name="exp-point"]') as HTMLInputElement
    ).value;
    const startDate = (
      document.querySelector('input[name="startDate"]') as HTMLInputElement
    ).value;
    const endDate = (
      document.querySelector('input[name="endDate"]') as HTMLInputElement
    ).value;

    if (
      !challengeName ||
      !description ||
      !expPoint ||
      !startDate ||
      !endDate ||
      endDate < startDate
    ) {
      alert("Please enter all information!");
      return;
    }

    const newChallenge = {
      name: challengeName,
      description: description,
      experience_point: parseInt(expPoint),
      start_date: startDate,
      end_date: endDate,
    };

    axiosInstance
      .post("/challenges", newChallenge, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        openSuccessModal("Challenge created successfully!");
        setTableData(currentPage, "");
      })
      .catch((error) => {
        openErrorModal("Failed to create challenge.");
      });

    closeModal();
  };

  const setTableData = (page: number, name: string) => {
    axiosInstance
      .get(`/challenges?page=${page}&name=${name}&limit=8`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setChallenges(response.data.data);
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

  const clickChangePage = (page: number) => {
    setTableData(page, currentName);
    setCurrentPage(page);
  };

  const deleteChallenge = (challengeId: string) => {
    axiosInstance
      .delete(`/challenges/${challengeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        openSuccessModal("Challenge deleted successfully!");
        setTableData(currentPage, currentName);
      })
      .catch((error) => {
        openErrorModal("Error deleted challenge!");
      });
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
        </div>
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
            <button type="button" className="cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <div className="bottom-data">
        <div className="tableItems">
          <div className="header">
            <i className="bx bx-table"></i>
            <h3>List Challenge</h3>
            <i className="bx bx-filter"></i>
            <form>
              <div className="form-input">
                <input
                  type="search"
                  placeholder="Search..."
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                />
                <button
                  className="search-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setTableData(1, currentName);
                  }}
                >
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
              {challenges && challenges.length > 0 ? (
                challenges.map((challenge) => (
                  <tr key={challenge.id}>
                    <td>{challenge.name}</td>
                    <td>{challenge.start_date}</td>
                    <td>{challenge.end_date}</td>
                    <td>{challenge.count_user_joined}</td>
                    <td>
                      <span
                        className={`status ${
                          challenge.status === true ? "active" : "deleted"
                        }`}
                      >
                        {challenge.status === true ? "active" : "deleted"}
                      </span>
                    </td>
                    <td className="challenge-action">
                      <div
                        className={`bx bx-trash ${
                          challenge.status === true ? "" : "display-none"
                        }`}
                        onClick={() => {
                          deleteChallenge(challenge.id);
                        }}
                      >
                        <div className="text-on-hover">deleted</div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Challenges already empty!</td>
                </tr>
              )}
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
export default ChallengePage;
