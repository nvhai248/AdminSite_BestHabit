import React from "react";
import { useAuth } from "../../provider/authContext";

const Dashboard: React.FC = () => {
  const { token, logout } = useAuth();

  console.log(token, localStorage.getItem("token"));

  return (
    <div>
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default Dashboard;
