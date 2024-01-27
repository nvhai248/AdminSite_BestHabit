import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useAuth } from "../../provider/authContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../configs/axios.config";

const NewOptions = (year: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Statistics on the number of users, habits, tasks and challenges created in ${year}`,
      },
    },
  };
};

const NewData = (statisticalData: any) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataSetHabit = new Array();
  const dataSetTask = new Array();
  const dataSetUser = new Array();
  const dataSetChallenge = new Array();

  for (let i = 0; i < 12; i++) {
    try {
      dataSetHabit.push(statisticalData.elements[i].habit_count);
    } catch (error) {
      dataSetHabit.push(0);
    }

    try {
      dataSetTask.push(statisticalData.elements[i].task_count);
    } catch (error) {
      dataSetTask.push(0);
    }

    try {
      dataSetUser.push(statisticalData.elements[i].user_count);
    } catch (error) {
      dataSetUser.push(0);
    }

    try {
      dataSetChallenge.push(statisticalData.elements[i].challenge_count);
    } catch (error) {
      dataSetChallenge.push(0);
    }
  }

  return {
    labels,
    datasets: [
      {
        label: "Habit",
        data: dataSetHabit,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Task",
        data: dataSetTask,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User",
        data: dataSetUser,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Challenge",
        data: dataSetChallenge,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };
};

const Dashboard: React.FC = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [statisticalData, setStatisticalData] = useState<any>({});
  const { token } = useAuth();
  const [yearQuery, setYearQuery] = useState<number>(new Date().getFullYear());
  const [optionsChart, setOptionsChart] = useState<any>({});
  const [dataChart, setDataChart] = useState<any>({});

  useEffect(() => {
    axiosInstance
      .get(`/statistical?year=${yearQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setStatisticalData(response.data.data);
          let option = NewOptions(yearQuery.toString());
          setOptionsChart(option);
          let data = NewData(response.data.data);
          setDataChart(data);

          console.log(dataChart, optionsChart);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => console.error(error));
  }, [yearQuery, token]);

  return (
    <main>
      <div className="header">
        <div className="left">
          <h1>Dashboard</h1>
        </div>
        <div className="inputTime">
          <div className="bx bx-search-alt"></div>
          <input
            type="number"
            placeholder="year"
            value={yearQuery}
            onChange={(e) => setYearQuery(parseInt(e.target.value))}
          />
        </div>
      </div>
      <ul className="insights">
        <li>
          <i className="bx bx-user-circle"></i>
          <span className="info">
            <h3>{statisticalData.user_count}</h3>
            <p>User</p>
          </span>
        </li>

        <li>
          <i className="bx bx-task"></i>
          <span className="info">
            <h3>{statisticalData.task_count}</h3>
            <p>Task</p>
          </span>
        </li>

        <li>
          <i className="bx bx-calendar-heart"></i>
          <span className="info">
            <h3>{statisticalData.habit_count}</h3>
            <p>Habit</p>
          </span>
        </li>

        <li>
          <i className="bx bx-run"></i>
          <span className="info">
            <h3>{statisticalData.challenge_count}</h3>
            <p>Challenge</p>
          </span>
        </li>
      </ul>
      <div className="bottom-data">
        <div className="chart">
          <h2>Statistical</h2>
          {dataChart.datasets ? (
            <Bar options={optionsChart} data={dataChart} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
