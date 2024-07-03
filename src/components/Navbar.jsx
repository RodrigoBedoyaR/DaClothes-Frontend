import React, { useState, useEffect } from "react";
import TokenManager from "../apiService/TokenManager";
import { Link, useNavigate } from "react-router-dom";
import {
  getCartContent,
  deleteFromCart,
  getTotalPrice,
} from "../apiService/apiService";
import Cart from "./Cart";
import { createOrder } from "../apiService/apiService";

function AppHeader() {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    TokenManager.clear;
    setClaims(null);
    navigate("/login");
  }
  function handleGetTotalPrice() {
    getTotalPrice(claims.userId)
      .then((data) => {
        setTotalPrice(data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  // function handleCreateOrder() {
  //   createOrder(claims.userId);
  //   alert("Order created successfully");
  //   window.location.reload();
  // }

  function handleGetCartContent() {
    getCartContent(claims.userId)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function handleRemoveFromCart(productId) {
    deleteFromCart(productId)
      .then(() => {

        window.location.reload();
      })
      .catch((error) => {

        setError(error);
      });
  }

  useEffect(() => {
    handleGetCartContent();
    handleGetTotalPrice();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/products">
          DaClothes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {claims.roles.includes("SELLER") && (
              <li className="nav-item">
                <a className="nav-link" href="/postProduct">
                  Post a product
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
          </ul>
          <div>
            {claims.roles.includes("BUYER") && (
              <button onClick={() => setIsCartVisible(!isCartVisible)}>
                Toggle Cart
              </button>
            )}
            {isCartVisible && (
              <>
                <Cart items={cart} totalPrice={totalPrice} />
                {/* <button className="btn btn-primary" onClick={handleCreateOrder}>
                  Create order
                </button> */}
              </>
            )}
          </div>
          <button className="d-flex me-2 btn" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/messages" className="d-flex me-2 btn">
            Messages
          </Link>
          <Link to="/userDetails" className="d-flex me-2 btn">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
