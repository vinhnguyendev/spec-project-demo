import axios from "axios";
import React from "react";
import { useState } from "react";
import '/Users/vinhnguyen/Documents/DevMountain/f25/spec/spec project/my-react-project/src/pages/Register.css'

function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const eventHandler = (name, email, password) => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios.post("http://localhost:5055/login", user).then((res) => {
      res.status(200).send("Account successfully created");
    });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create an account</h2>
        <form className="register-form-container">
          <div className="input-container">
            <label>Name</label>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              id="name-input"
              className="user-input"
              type="text"
              placeholder="name"
            />
            <label>Email</label>
            <input
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              id="email-input"
              className="user-input"
              type="text"
              placeholder="email"
            />
            <label>Password</label>
            <input
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              id="password-input"
              className="user-input"
              type="password"
              placeholder="password"
            />
            <button
              onClick={(e) => {
                eventHandler(userName, userEmail, userPassword);
              }}
            >
              Create account
            </button>
          </div>
           </form>
      </div>
    </div>
  );
}

export default Register;
