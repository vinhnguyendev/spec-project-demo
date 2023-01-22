import React from "react";
import "./FoodCard.css";
import axios from "axios";
import { GiHamburger } from "react-icons/gi";
import { MdSetMeal } from "react-icons/md";
import { BsFillBasket2Fill } from "react-icons/bs";
axios.defaults.withCredentials = true;

export default function FoodCard(props) {
  const data = props.value;
  const userId = props.id;
  console.log(data);
  console.log(userId);
  //add data to a database
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
          user_id: userId,
          cal: item.nutrients.ENERC_KCAL,
          protein: item.nutrients.PROCNT,
          fat: item.nutrients.FAT,
          carb: item.nutrients.CHOCDF,
          date: orderDate(),
        };

        axios.post("http://localhost:5055/usersorder", userSelect);
      } else {
      }
    });
  };

  return (
    <div className="header-container">
      {data.map(function (item) {
        const { foodId, label, category } = item;
        const { ENERC_KCAL, PROCNT, FAT, CHOCDF, FIBTG } = item.nutrients;
        const x = <GiHamburger />;
        const y = <BsFillBasket2Fill />;
        const z = <MdSetMeal />;
        function categoryCheck(param) {
          if (param === "Fast foods") {
            return x;
          } else if (param === "Generic food") {
            return y;
          } else if (param === "Packaged foods") {
            return z;
          }
        }

        return (
          <div
            className="nutr"
            key={data.indexOf(item)}
            id={`${data.indexOf(item)}`}
          >
            <div className="foodcard-header">
              <div className="icon-container">
                <div className="icon_category">{categoryCheck(category)}</div>
                <div className="food_category">{category}</div>
              </div>
              <button
                className="add-button"
                onClick={() => eventHandler(foodId, label)}
              >
                add item
              </button>
            </div>
            <div className="foodcard-body">
              <div className="food-item-pic"></div>
              <div className="food-item-details-container">
              <div className="food-item-details">
                <div className="nutr-text" id="item-name">
                  {item.label}
                </div>
                <div className="nutr-text">Per Serving - 100g</div>
                <div className="nutr-text">
                  <span className="nutr-label" id="nutr-cal">
                    {parseInt(ENERC_KCAL)}cal
                  </span>
                </div>
                <div className="nutr-text">
                  <span className="nutr-label" id="nutr-protein">
                    PROTEIN:
                  </span>
                  {parseInt(PROCNT)}g
                </div>
                <div className="nutr-text">
                  <span className="nutr-label" id="nutr-fat">
                    FAT:
                  </span>
                  {parseInt(FAT)}g
                </div>
                <div className="nutr-text">
                  <span className="nutr-label" id="nutr-carb">
                    CARB:
                  </span>
                  {parseInt(CHOCDF)}g
                </div>
              </div>

              <div className="food-item-ing">
                {}
              </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
