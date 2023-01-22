import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import logo from "../assets/logo.png";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate();

  const eventHandler = (email, password, e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    URL =
      process.env.NODE_ENV === "production"
        ? "/login"
        : "http://localhost:5055/login";

    axios
      .post(`${URL}`, user)
      .then((res) => {
        const auth = res.data.true;
        console.log(auth)
        if (auth) {
         cookies.set("id",res.data.userId, { path: '/' })
          navigate("/home");
        } else if (!auth) {
          const message = "Wrong email or password. Please try again!";
          setErrorMessage(message);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
          setServerError(true);
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-picture-container">
          <img src={login}></img>
          <div className="register_picture-logo-container">
            <img src={logo}></img>
          </div>
          <h2 id="login_header__text">Easily Track Your Nutrition</h2>
        </div>
        <div className="sign-in">
          <div className="sign-in_container">
            <div className="login_container_label">
              <h2>Sign in to continue</h2>
            </div>
            <div className="server-error-wrap" style={{display:"flex", justifyContent:'center'}}>{
              serverError? <div className="Alert" style={{display: 'inine-flex', textAlign: 'center',border: '0.2rem solid salmon',borderRadius:"2rem", width: '70%', backgroundColor: '#fdcfca',
              marginBottom: "1rem", color: "#fa8072"}}>
                <h2>Internal Server Error</h2>
                <p>Something went wrong at our end! Don't worrry, we'll fix it soon. Please try later</p>
              </div> : ''
              }
            </div>
            <form
              className="login-form"
              onSubmit={(e) => eventHandler(userEmail, userPassword, e)}
            >
              <div className="errorText" style={{color:'salmon'}}>{errorMessage}</div>
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
              <div className="Link" id="link-register">
                <span id="message">Don't have an account? </span>
                <span id="create-link">
                  <Link to={`register`}>Create Account</Link>
                </span>
              </div>
              <div className="login-button-container">
              <button className="login-button">SIGN IN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
