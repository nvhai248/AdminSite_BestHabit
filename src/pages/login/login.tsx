import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");

  const handleRemember = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailInput = document.getElementsByName(
      "email"
    )[0] as HTMLInputElement;
    const passwordInput = document.getElementsByName(
      "password"
    )[0] as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      return setNotification("Please provide your email and password!");
    }

    try {
      let result = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      const token = result.data.data.token;

      // use token for another page
      setToken(token);

      console.log(isChecked);

      if (isChecked) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      console.log(localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as any;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.key === "ErrEmailOrPasswordInvalid"
      ) {
        setNotification(
          "Email or password is invalid. Please check your credentials!"
        );
      } else {
        // Handle other errors
        console.error(axiosError);
        setNotification("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <h3>Enter your credentials</h3>

      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberCheckbox"
            onChange={() => {}}
            onClick={handleRemember}
            checked={isChecked}
          />
          <label htmlFor="rememberCheckbox">Remember me</label>
        </div>
        <p className="notification">{notification}</p>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
