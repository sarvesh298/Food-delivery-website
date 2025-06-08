import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function MenuItem({ image, name, price, onAddToCart }) {
  return (
    <div className="menuItem">
      <div 
        className="menuItemImage" 
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="menuItemContent">
        <h1>{name}</h1>
        <p className="price">₹{price}</p>
        <button className="addToCartBtn" onClick={onAddToCart}>
          <AddShoppingCartIcon />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
