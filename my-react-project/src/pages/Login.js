import React, { useState } from "react";
import axios from "axios";
import "/Users/vinhnguyen/Documents/DevMountain/f25/spec/spec project/my-react-project/src/pages/Login.css";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const eventHandler = (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    console.log(user)

    axios
    .post("http://localhost:5055/login", user)
    .then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="photo"></div>
        <div className="sign-in">
          <h2>Sign in to continue</h2>
          <form className="login-form">
            <div className="input-container">
              <label>Username</label>
              <input
                className="login-input"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                type="text"
                placeholder="Email"
              />
              <label>Password</label>
              <input
                className="login-input"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />

              <button
                className="login-button"
                onClick={(e) => {
                  eventHandler(userEmail, userPassword);
                }}
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
