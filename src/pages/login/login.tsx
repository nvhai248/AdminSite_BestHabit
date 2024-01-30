import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axiosInstance from "../../configs/axios.config";
import { useAuth } from "../../provider/authContext";
import { styled } from "styled-components";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const CssLoginPage = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    background-image: url("imgs/background.svg");
    background-repeat: no-repeat;
    background-size: cover;
    font-family: "Ubuntu";
    color: #000;
    animation: rotate 6s infinite alternate linear;
  `;

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

      if (isChecked) {
        localStorage.setItem("token", token);
      } /* else {
        localStorage.removeItem("token");
      } */

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
    <CssLoginPage>
      <div className="login-card">
        <h2>Login</h2>
        <h3>Enter your credentials</h3>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <div className="remember-me">
            <input
              type="radio"
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
    </CssLoginPage>
  );
};

export default Login;
