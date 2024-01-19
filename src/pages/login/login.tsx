import React from "react";
import "./login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login logic here
    console.log("OK");
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <h3>Enter your credentials</h3>

      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <a href="#">Forget your password?</a>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
