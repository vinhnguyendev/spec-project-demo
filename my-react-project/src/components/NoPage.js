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
            </div>