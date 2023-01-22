import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import signin from '../assets/signin.png'
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [signUp, setSignUp] = useState(); // create loading state
  const [errorMessage, setErrorMessage] = useState();

const renderRegisterPage = () => {
  setSignUp(signUpWindow())
  setErrorMessage(errorMessageWindow())
}
useEffect(() => {
  renderRegisterPage()
    },[]);

  const submitHandler = (name, email, password, event) => {
    event.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5055/test", user) // change to login!
      .then((res) => {
        if (res.status > 200){
          console.log('error')
        }else{
       navigate("/")
        }
      })
      .catch((error) => {
        setErrorState(true);
        console.log(error);
      });
    console.log(errorState);
  };

  const errorMessageWindow = () => {
    return (
      <div className="register_error_page">
        <div className="register_error_page-container">
          <h2>
            Sorry something went wrong!<br></br>Refresh page and try again.
          </h2>
        </div>
      </div>
    );
  };

  const signUpWindow = () => {
    return (
      <div className="register-container">
        <div className="register_picture-container">
          <div className="register_picture-logo-container">
            <img src={logo}></img>
          </div>
          <div className="register_picture-container-img">
          <img src={signin}></img>
          </div>
          <div className="register_picture-container-text">
            <h2>Already have an account?</h2>
            <div className="register_picture-container-text-sub-header">
            <p className="picture-content"> Easily Track Your Nutrition and Reach Your Goals.<br></br>Eat Smarter, Feel Better - Start Your Health Journey Now!</p>
            </div>
            <div className="register-link-button-container">                    
              <Link to={"/"}>
                <button className="register-link-button">SIGN IN</button>
              </Link>
             
            </div>
          </div>
        </div>
        <div className="sign-in">
        <div className="sign-in_container">
          <div className='login_container_label'>
          <h2>Create an account</h2>
          </div>
          <form className="login-form">
            
              <label className="sign-in-label">Name</label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                id="name-input"
                className="login-input"
                type="text"
                placeholder="name"
              />
              <label className="sign-in-label">Email</label>
              <input
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                id="email-input"
                className="login-input"
                type="text"
                placeholder="email"
              />
              <label className="sign-in-label">Password</label>
              <input
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                id="password-input"
                className="login-input"
                type="password"
                placeholder="password"
              />
              <div className="login-button-container">
              <button
                className="login-button"
                id="register-btn"
                type="submit"
                onClick={(event) => {
                  submitHandler(userName, userEmail, userPassword, event);
                }}
              >
                Create account
              </button>
              </div>
          </form>
        </div>
      </div>
      </div>
    );
  };

  if (errorState === true) {
    return <div className="register-page">{errorMessage}</div>;
  } else {
    return <div className="register-page">{signUp}</div>;
  }
}
