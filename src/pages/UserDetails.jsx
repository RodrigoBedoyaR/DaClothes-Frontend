import AppHeader from "../components/Navbar";
import { getUserById, getProductsByUserId } from "../apiService/apiService";
import TokenManager from "../apiService/TokenManager";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { getOrdersByUserId } from "../apiService/apiService";

function UserDetails() {
  const [user, setUser] = useState(null);
  const userId = TokenManager.getClaims()?.userId;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [orders, setOrders] = useState([]);

  function handleGet() {
    getUserById(userId)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });
    if (claims.roles.includes("SELLER")) {
      getProductsByUserId(userId)
        .then((data) => setProducts(data))
        .catch((error) =>
          error instanceof Error
            ? setError(error)
            : setError(new Error("unknown error"))
        );
    } else if(claims.roles.includes("BUYER")) {
      getOrdersByUserId(userId)
        .then((data) => setOrders(data))
        .catch((error) =>
          error instanceof Error
            ? setError(error)
            : setError(new Error("unknown error"))
        );
    }
  }


  useEffect(() => {
    handleGet();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container user-details-container">
        <Link to={`/updateUser`} className="btn btn-primary">
          Update User
        </Link>
        <br />
        {claims.roles.includes("SELLER") && (
          <>
          <br />
            <h1 className="section-title">Your Products:</h1>
            <div className="row">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
        {claims.roles.includes("BUYER") && (
          <>
            <h1 className="section-title">Your Orders:</h1>
            <div className="row">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );

}
export default UserDetails;
