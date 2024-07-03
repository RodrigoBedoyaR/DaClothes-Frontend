import React, { useState } from "react";
import { deleteFromCart } from "../apiService/apiService";

function CartItem({ item }) {
  const [error, setError] = useState(null);

  function handleRemoveFromCart(productId) {
    deleteFromCart(productId)
      .then(() => {
        alert("Product deleted from cart");
        window.location.reload();
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Product: {item.name}</h5>
        <p className="card-text">Price: {item.price}€</p>
        <button
          className="btn btn-danger"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
