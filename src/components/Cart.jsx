import React from "react";
import CartItem from "./CartItem";
import { createOrder } from "../apiService/apiService";
import TokenManager from "../apiService/TokenManager";
import { clearCartContent } from "../apiService/apiService";
import { useNavigate } from "react-router-dom";

function Cart({ items, totalPrice }) {
  const claims = TokenManager.getClaims();
  const navigate = useNavigate();

  function handleCreateOrder() {
    createOrder(claims.userId);
    alert("Order created successfully");
    navigate("/userDetails");
  }

  function handleClearCart() {
    clearCartContent(claims.userId);
    alert("Cart cleared successfully");
    window.location.reload();
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <hr />
          <p className="total-price">Total Price: {totalPrice}€</p>
          <button className="btn btn-primary" onClick={handleCreateOrder}>
            Create order
          </button>
          <button className="btn btn-danger" onClick={handleClearCart}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
