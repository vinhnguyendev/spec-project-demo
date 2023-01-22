import axios from "axios";
import React, { useState, useEffect } from "react";
// import { Navbar, FoodCard } from "./";
import logo from "../assets/logo.png";
// import ResultContainer from "./ResultContainer";
import EnhancedTable from "./EnhancedTable";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const LoadingBackDrop = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (response.length === 0) {
      console.log("loading...");
    }
  }, [response]);

  useEffect(() => {
    axios.get(`http://localhost:5055/users/`+`${cookies.get('id')}`).then((res) => {
      const sessionUser = res.data[0];
      console.log(sessionUser)
      const { name,email} = sessionUser;
      cookies.set("name",name)
      cookies.set("email",email)  
      setUserName(cookies.get("name"));
      setUserId(cookies.get("id"));
    })  
  }, [userName]);

 
  const SEARCH_URL = 'https://api.edamam.com/api/food-database/v2/parser?app_id=7f049ac7&app_key=cba54b67199e3729c1ebbef3e1a8d721&ingr='

  const eventHandler = (food) => {
    if(request.length > 0){
    setLoader(true)
    }
    axios
      .get(
        `${SEARCH_URL}${food}`
      )
      .then((res) => {
        const responseData = res.data.hints.map((data) => data.food)  
        let filteredArr = responseData.filter((item, index) => {
          return responseData.findIndex(i => i.label === item.label) === index;
        });
        setResponse(filteredArr);
        setLoader(false)
      })
      .catch((err) => {
        console.log(err);
      });

  };


// console.log(response)
  const SideBar = () => {
    return (
      <div className="dashboard_side_bar-container">
        {/* <div className="dashboard_side_bar-head">
        <img src={logo}></img> 
      </div> */}
        <div className="user-greeting">
          <h1>Hello, {userName}!</h1>
        </div>
        <div className="dashboard_side_bar-links-container"></div>
        <div className="dashboard_side_bar-footer"></div>
      </div>
    );
  };


  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-interface-container">
        <div className="food-search">
          <div className="search-container">
            <h2>Food Search</h2>
            <input
              onChange={(e) => {
                setRequest(e.target.value);
              }}
              id="user-input"
              type="text"
              placeholder="search"
              className="dashboard-interface-search-bar-input"
            ></input>
            <button
              className="search-button"
              onClick={(e) => {
                eventHandler(request);
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div className="search-result-container">    
        {loader? 
          <LoadingBackDrop/> 
        :
          <EnhancedTable userId={userId} response={response} />  
        }       
          {/* <ResultContainer userId={userId} response={response}/> */}
          {/* <FoodCard id={userId} value={response}/> */}
        </div>
      </div>
      <div className="x">jjjj</div>
    </div>
  );
}
