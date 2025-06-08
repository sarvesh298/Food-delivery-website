import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../styles/Menu.css";

function Menu() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      // If item already exists, increase quantity
      setCart(cart.map(cartItem => 
        cartItem.name === item.name 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    // Optional: Show confirmation message
    alert(`${item.name} added to cart!`);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const viewCart = () => {
    navigate('/cart', { state: { cartItems: cart } });
  };

  return (
    <div className="menu">
      <div className="menuHeader">
        <h1 className="menuTitle">Our Menu</h1>
        {cart.length > 0 && (
          <div className="cartSummary" onClick={viewCart}>
            <ShoppingCartIcon />
            <span>Cart: {getTotalItems()} items</span>
          </div>
        )}
      </div>
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              onAddToCart={() => addToCart(menuItem)}
            />
          );
        })}
      </div>
      {cart.length > 0 && (
        <div className="viewCartSection">
          <button className="viewCartBtn" onClick={viewCart}>
            <ShoppingCartIcon />
            View Cart ({getTotalItems()} items)
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
