import React, { useState } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import "/Users/vinhnguyen/Documents/DevMountain/f25/spec/spec project/my-react-project/src/pages/FoodTracker.css";

function FoodTracker() {
  const [value, onChange] = useState(new Date());
  const [response, setResponse] = useState("");
  const userDateInput = {
    date:
      `0${value.getMonth() + 1}/` +
      `${value.getDate()}/` +
      `${value.getFullYear()}`,
  };

  const eventHandler = (req, res) => {
    axios
      .post("http://localhost:5055/order-history", userDateInput)
      .then((res) => {
        console.log("Here food you got on this day!");
        console.log(res.data);
        setResponse(orderCardRender(res.data));
      })
      .catch((err) => {
        console.log("No food found!");
      });
  };

  const orderCardRender = (responseData) => {
    if (responseData.length == 0) {
      alert("Hey looks like you didn't add any food on this date..");
    } else {
      return responseData.map(function (order) {
        const { productName, productCal } = order;
        return (
          <div className="response-item-container">
            <h3>{order.productName}</h3>
            <h3>{order.productCal}Cal</h3>
            <button id="delete-button">x</button>
          </div>
        );
      });
    }
  };

  return (
    <div className="foodTracker-container">
      
      <div className="tracker-container">
        <div className="date-container">
          <DatePicker onChange={onChange} value={value} />
        </div>
        <div className="content-container">
          <div className="content">
            <h2>Food History:</h2>
            <div className="history"></div>
            <button onClick={eventHandler}>Check History</button>
            <div className="response-container">
              {response}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodTracker;
