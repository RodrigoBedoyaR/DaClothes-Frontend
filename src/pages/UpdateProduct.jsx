import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../apiService/apiService";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TokenManager from "../apiService/TokenManager";

function UpdateProductForm() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    size: "",
    category: "",
    brand: "",
    productCondition: "",
    price: "",
    userId: TokenManager.getClaims()?.userId,
    available: Boolean,
  });

  // const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  function handleGet() {
    getProductById(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value === "true" ? true : value === "false" ? false : value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProduct(product)
      .then((data) => {
        alert("Product updated successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGet();
  }, [id]);

  if (!product) {
    console.log(error);
    return <div>Not found</div>;
  }
  return (
    <>
    <Navbar />
      <div className="container">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="size" className="form-label">
              Size
            </label>
            <input
              type="text"
              className="form-control"
              id="size"
              name="size"
              value={product.size}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
          <label>Product category</label>
            <select
              onChange={handleInputChange}
              name="category"
              value={product.category}
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
          <label>Product condition</label>
            <select
              onChange={handleInputChange}
              name="productCondition"
              value={product.productCondition}
              className="form-control"
            >
              <option value="">Select the condition</option>
              <option value="New">New</option>
              <option value="Barely used">Barely used</option>
              <option value="Used">Used</option>
              <option value="Heavily used">Heavily used</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Availability</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="available"
                name="available"
                value="true"
                checked={product.available === true}
                onChange={handleInputChange}
              />
              <label htmlFor="available">Available</label>
            </div>
            <div className="form-check form-check-inline">

            <input
              type="radio"
              className="form-check-input"
              id="not-available"
              name="available"
              value="false"
              checked={product.available === false}
              onChange={handleInputChange}
            />
            <label htmlFor="not-available">Not Available</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
            </button>
        </form>
      </div>
    </>
  );
}
export default UpdateProductForm;
