import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";


import {Navbar} from "./";

function FoodTracker() {
  const [value, onChange] = useState(new Date());
  const [response, setResponse] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [totalCal, setTotalCal] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);

  const userDateInput = {
    date:
      `${value.getMonth() + 1}/` +
      `${value.getDate()}/` +
      `${value.getFullYear()}`,
  };

  useEffect(() => {
    axios.get("http://localhost:5055/check").then((res) => {
      const sessionUser = res.data;
      const { name, email } = sessionUser;
      setUserName(sessionUser.name);
      setUserEmail(sessionUser.email);
    });
  }, []);

  const eventHandler = (req, res) => {
    axios
      .post("http://localhost:5055/order-history", userDateInput)
      .then((res) => {
        setResponse(orderCardRender(res.data));
        const data = res.data;

        //

        setTotalCal(sumData(data, "cal"));
        setTotalCarb(sumData(data, "carb"));
        setTotalFat(sumData(data, "fat"));
        setTotalProtein(sumData(data, "protein"));
      })
      .catch((err) => {
        console.log("No food found!");
      });
  };

  //delete item
  const deleteItem = (id,data) => {
  axios
  .delete(`http://localhost:5055/users/${id}`)
  .then(res => {
    alert ("item has been deleted!")
  })
   
    
    const newArray = data.filter(function (item) {
      if (item.id !== id) {
        return data;
      }
    });

    setResponse(orderCardRender(newArray));
    setTotalCal(sumData(newArray, "cal"));
        setTotalCarb(sumData(newArray, "carb"));
        setTotalFat(sumData(newArray, "fat"));
        setTotalProtein(sumData(newArray, "protein"));
  };

  //sum data function
  const sumData = (data, element) => {
    const convertData = data.map((item) => {
      return parseInt(item[element]);
    });
    const totalSum = convertData.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    return totalSum;
  };
  

  const orderCardRender = (responseData) => {
    if (responseData.length == 0) {
      alert("Hey looks like you didn't add any food on this date..");
    } else {
      console.log("this is responseDta");
      console.log(responseData);
      return responseData.map(function (order) {
        return (
          <div className="response-item-container">
            <h3>{order.item_name}</h3>
            <h3>{parseInt(order.cal)}Cal</h3>
            <h3>{parseInt(order.protein)}g</h3>
            <h3>{parseInt(order.fat)}g</h3>
            <h3>{parseInt(order.carb)}g</h3>
            <button
              id="delete-button"
              onClick={() => deleteItem(order.id, responseData)}
            >
              delete item
            </button>
          </div>
        );
      });
    }
  };

  return (
    <div className="foodTracker-container">
      <Navbar className="nav-header" />
      <div className="tracker-container">
        <div className="profile-container">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
            className="profile-photo"
          ></img>
          <div className="profile-info-container">
            <h1 className="profile-info" id="profile-name">
              {userName}
            </h1>
            <h2 className="profile-info" id="profile-age">
              29 years old
            </h2>
            <h2 className="profile-info" id="profile-email">
              {userEmail}
            </h2>
          </div>
        </div>

        <div className="statistic-container">
          <h2 className="statistic-text" id="cal">
            <span id="totalcal">{totalCal}</span>cal
          </h2>
          <div className="statistic-text" id="nutririents">
            <h4><span id="protein">Protein:</span>{totalProtein}g</h4>
            <h4><span id="fat">Fat:</span>{totalFat}g</h4>
            <h4><span id="carb">Carb:</span>{totalCarb}g</h4>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="user-history-header">
          <div className="user-history-container">
            <div className="greeting-text">
              Welcome! to your Profile Dashboard
            </div>
            <div className="date-container">
              <div id="pick-date-text">Date:</div>
              <DatePicker
                className="date-selector"
                onChange={onChange}
                value={value}
              />
              <button id="search-history" onClick={eventHandler}>
                search
              </button>
            </div>
          </div>
        </div>

        <div className="response-container">{response}</div>
      </div>
    </div>
  );
}

export default FoodTracker;
