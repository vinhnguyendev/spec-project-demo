import axios from "axios";
import React, { useState } from "react";
import FoodCard from "../components/FoodCard";
import "/Users/vinhnguyen/Documents/DevMountain/f25/spec/spec project/my-react-project/src/pages/Dashboard.css";

function Dashboard() {
  const [request, setRequest] = useState("");
  const [response, setResponse] = useState([]);

  const eventHandler = (food) => {
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=7f049ac7&app_key=cba54b67199e3729c1ebbef3e1a8d721&ingr=${food}`
      )
      .then((res) => {
        console.log(res.data);

        setResponse(res.data.hints.map((element) => element.food));
      })
      .catch((err) => {
        err.status(404).send("Can not find item");
      });
  };

  return (
    <div className="dashboard-container">
      
      <div className="food-search">
        <div className="user-greeting"> 
        <h1 className="user-greeting">Hello, Username!</h1>
        </div>
        <div className="search-container">
          <h2>Food Search</h2>
          <input
            onChange={(e) => {
              setRequest(e.target.value);
            }}
            id="user-input"
            type="text"
            placeholder="search"
          ></input>
          <button className="search-button"
            onClick={(e) => {
              eventHandler(request);
            }}
          >
            SEARCH
          </button>

          <br></br>
        
          <br></br>
          <FoodCard value={response} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
