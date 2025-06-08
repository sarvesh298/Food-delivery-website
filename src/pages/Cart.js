import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Cart.css";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const updateQuantity = (itemName, change) => {
    // This would typically update global state
    // For now, it's just a placeholder
    console.log(`Update ${itemName} quantity by ${change}`);
  };

  const removeItem = (itemName) => {
    // This would typically remove from global state
    console.log(`Remove ${itemName} from cart`);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cartHeader">
          <button className="backBtn" onClick={() => navigate("/menu")}>
            <ArrowBackIcon />
            Back to Menu
          </button>
          <h1 className="cartTitle">Your Cart</h1>
        </div>
        <div className="emptyCart">
          <ShoppingCartIcon className="emptyCartIcon" />
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from our menu!</p>
          <button className="shopNowBtn" onClick={() => navigate("/menu")}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cartHeader">
        <button className="backBtn" onClick={() => navigate("/menu")}>
          <ArrowBackIcon />
          Back to Menu
        </button>
        <h1 className="cartTitle">Your Cart ({getTotalItems()} items)</h1>
      </div>

      <div className="cartContent">
        <div className="cartItems">
          {cartItems.map((item, index) => (
            <div key={index} className="cartItem">
              <div className="cartItemImage">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cartItemDetails">
                <h3>{item.name}</h3>
                <p className="itemPrice">${item.price}</p>
                <div className="quantityControls">
                  <button 
                    className="quantityBtn"
                    onClick={() => updateQuantity(item.name, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantityBtn"
                    onClick={() => updateQuantity(item.name, 1)}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
              <div className="cartItemActions">
                <div className="itemTotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  className="removeBtn"
                  onClick={() => removeItem(item.name)}
                >
                  <DeleteIcon />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cartSummary">
          <div className="summaryCard">
            <h3>Order Summary</h3>
            <div className="summaryRow">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>${getTotalPrice()}</span>
            </div>
            <div className="summaryRow">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="summaryRow">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <hr />
            <div className="summaryRow total">
              <span>Total</span>
              <span>${(parseFloat(getTotalPrice()) + 2.99 + parseFloat(getTotalPrice()) * 0.08).toFixed(2)}</span>
            </div>
            <button className="checkoutBtn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;