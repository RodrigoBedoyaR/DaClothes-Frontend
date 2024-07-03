import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProductById, addToCart } from "../apiService/apiService";
import AppHeader from "./Navbar";
import levis from "/src/assets/Levis_505_Front.jpg";
import { Link } from "react-router-dom";
import TokenManager from "../apiService/TokenManager";


function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [claims, setClaims] = useState(TokenManager.getClaims());

  function handleGet() {
    getProductById(id)
      .then((data) => {
        setProduct(data);

      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }

  useEffect(() => {
    handleGet();
  }, [id]);

  if (!product) {
    return <div>Not found</div>;
  }

  function handleAddToCart(productId) {
    addToCart(productId)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function cart(){
    if (product.available) {
      return(
    <div>
    <button
      onClick={() => handleAddToCart(id)}
      className="btn btn-primary"
    >
      Add to cart
    </button>
  </div>
  )}
  else {
    return (
    <div>
    <button
      className="btn btn-primary"
      disabled
    >
      Product unavailable
    </button>
    </div>
    )}
  }

  return (
    <>
      <AppHeader />
      <br />
      <div className="card">
        {error ? <p className="red">{error.message}</p> : null}

        <img
          src={levis}
          className="card-img-top"
          alt={product.name}
          style={{ objectFit: "cover", height: "100%", width: "15%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Size:</strong> {product.size}
            </li>
            <li className="list-group-item">
              <strong>Category:</strong> {product.category}
            </li>
            <li className="list-group-item">
              <strong>Brand:</strong> {product.brand}
            </li>
            <li className="list-group-item">
              <strong>Condition:</strong> {product.productCondition}
            </li>
            <li className="list-group-item">
              <strong>Price:</strong> {product.price}€
            </li>
            <li className="list-group-item">
              <strong>Available:</strong> {product.available ? "Yes" : "No"}
            </li> 
            <li className="list-group-item">
              <strong>Seller:</strong> {product?.username.name}
            </li>
          </ul>
        </div>

        <div>
          {claims?.userId !== product?.username.id && (
          <Link className="btn btn-primary" to={'/messages'}>Message {product?.username.name}</Link>
          )}</div>
        <br />
        <div>
          {claims?.roles.includes("BUYER") && (
            cart()
          )}
        </div>
      </div>
    </>
  );
}

export default ProductInfo;