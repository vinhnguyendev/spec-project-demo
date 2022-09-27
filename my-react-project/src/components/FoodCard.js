import React from "react";
import "./FoodCard.css";
import axios from "axios";
axios.defaults.withCredentials = true

function FoodCard(props) {
  const data = props.value;
  console.log(data);

  const eventHandler = (id, name, cal, protein, fat, carb) => {
    function orderDate() {
      const date = new Date();
      return (
        `${date.getMonth() + 1}/` +
        `${date.getDate()}/` +
        `${date.getFullYear()}`
      );
    }

    data.map((item) => {
      if (item.foodId == id && item.label == name) {
        const userSelect = {
        name: item.label,
        cal: item.nutrients.ENERC_KCAL,
        protein: item.nutrients.PROCNT,
        fat: item.nutrients.FAT,
        carb: item.nutrients.CHOCDF,
        date: orderDate(),
        };

        console.log(userSelect);
        axios.post("http://localhost:5055/usersorder", userSelect);
      } else {
      }
    });
  };

  return (
    <div className="header-container">
      {data.map(function (item) {
        const { foodId, label } = item;
        const { ENERC_KCAL, PROCNT, FAT, CHOCDF, FIBTG } = item.nutrients;

        return (
          <div className="nutr">
            <div className="nutr-text" id="item-name">
              {item.label}
            </div>

            <div className="nutr-text">Per Serving - 100g</div>
            <div className="nutr-text">
              <span className="nutr-label" id="nutr-cal">
                {parseInt(item.nutrients.ENERC_KCAL)}cal
              </span>
            </div>
            <div className="nutr-text">
              <span className="nutr-label" id="nutr-protein">
                PROTEIN:
              </span>
              {parseInt(item.nutrients.PROCNT)}g
            </div>
            <div className="nutr-text">
              <span className="nutr-label" id="nutr-fat">
                FAT:
              </span>
              {parseInt(item.nutrients.FAT)}g
            </div>
            <div className="nutr-text">
              <span className="nutr-label" id="nutr-carb">
                CARB:
              </span>
              {parseInt(item.nutrients.CHOCDF)}g
            </div>
            <button
              className="add-button"
              onClick={() => eventHandler(item.foodId, item.label)}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FoodCard;
