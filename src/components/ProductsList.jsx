import { useEffect, useState } from "react";
import { retrieveProductsFromServer } from "../apiService/apiService";
import { getProductByFilter } from "../apiService/apiService";
import AppHeader from "./Navbar";
import ProductCard from "./ProductCard.jsx";
import { getProductsBySearching } from "../apiService/apiService";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]); 
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState({
    size: "",
    category: "",
    productCondition: "",
  });

  function handelGetAll(event) {
    retrieveProductsFromServer()
      .then((data) => setProducts(data))
      .catch((error) =>
        error instanceof Error
          ? setError(error)
          : setError(new Error("unknown error"))
      );
  }

  function handleSearch() {
    getProductsBySearching(search)
      .then((data) => {
        setProducts(data.products);
        console.log(data); 
      })
      .catch((e) => setError(e));
  }

  useEffect(() => {
    handelGetAll();
  }, []);

  function handleGetByFilter() {
    setSearch("");
    getProductByFilter(filterData)
      .then((data) => setProducts(data))
      .catch((e) => setError(e));
  }

  function handleResetFilters() {
    handelGetAll();
    setSearch("");
    setFilterData({
      size: "",
      category: "",
      productCondition: "",
    });
    setError(null);
  }

  return (
    <>
      <AppHeader />
      <br />
      <div className="container">
      <div className="col-md-4 mb-2">

            <input
              type="text"
              placeholder="Search"
              value={search}
              className="form-control"
              onChange={(e) =>
                setSearch(e.target.value)             }
            />
            <button className="btn btn-secondary btn-block"
            onClick={handleSearch}>
              Search
            </button>

          </div>
        <div className="row">

          <div className="col-md-4 mb-2">
            <input
              type="text"
              placeholder="Size"
              value={filterData.size}
              className="form-control"
              onChange={(e) =>
                setFilterData({ ...filterData, size: e.target.value })
              }
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              value={filterData.productCondition}
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  productCondition: e.target.value,
                })
              }
              className="form-control"
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Barely used">Barely used</option>
              <option value="Used">Used</option>
              <option value="Heavily used">Heavily used</option>
            </select>
          </div>
          <div className="col-md-4 mb-2">
            <select
              value={filterData.category}
              onChange={(e) =>
                setFilterData({ ...filterData, category: e.target.value })
              }
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="shoes">Shoes</option>
              <option value="shirts">Shirts</option>
              <option value="jeans">Jeans</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-secondary btn-block"
              onClick={handleGetByFilter}
            >
              Filter Products
            </button>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-secondary btn-block"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>

          <div className="row mt-3">
            {error || products.length ===0 ?  (
              <h1 className="red">No products found</h1>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductsList;
