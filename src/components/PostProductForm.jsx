import React, { useState } from "react";
import { postProductToServer } from "../apiService/apiService";
import TokenManager from "../apiService/TokenManager";
import AppHeader from "./Navbar";

import Navbar from "./Navbar";
import { any } from "prop-types";
function postProductForm() {
  const [post, setPost] = useState({
    name: "",
    description: "",
    size: "",
    category: "",
    brand: "",
    productCondition: "",
    price: "",
    userId: TokenManager.getClaims()?.userId,
  });
  function handleInput(event) {
    setPost({ ...post, [event.target.name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    postProductToServer(post);
    alert("Product added");
    window.location.reload();
  }
  return (
    <>
      <AppHeader />
      <div className="container">
        <form>
          <div className="form-group">
            <label>Product name</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              name="name"
              placeholder="Name of the product"
            />
          </div>
          <div className="form-group">
            <label>Product description</label>
            <textarea
              type="text"
              onChange={handleInput}
              className="form-control"
              name="description"
              placeholder="Description of the product"
              rows={4}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Product size</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              name="size"
              placeholder="Size of the product"
            />
          </div>
          <div className="form-group">
            <label>Product category</label>
            <select
              onChange={handleInput}
              name="category"
              value={post.category}
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
            </select>
          </div>
          <div className="form-group">
            <label>Product brand</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              name="brand"
              placeholder="Brand of the product"
            />
          </div>
          <div className="form-group">
            <label>Product condition</label>
            <select
              onChange={handleInput}
              name="productCondition"
              value={post.productCondition}
              className="form-control"
            >
              <option value="">Select the condition</option>
              <option value="New">New</option>
              <option value="Barely used">Barely used</option>
              <option value="Used">Used</option>
              <option value="Heavily used">Heavily used</option>
            </select>
          </div>
          <div className="form-group">
            <label>Product price</label>
            <input
              type="number"
              min={1}
              step={0.01}
              onChange={handleInput}
              className="form-control"
              name="price"
              placeholder="€0.00"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={(event) => {
                handleSubmit(event);
              }}
              className="btn btn-primary mb-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default postProductForm;
