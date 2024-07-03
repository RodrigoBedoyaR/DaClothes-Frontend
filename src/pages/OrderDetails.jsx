import { useParams } from "react-router-dom";
import AppHeader from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getProductsByOrderId } from "../apiService/apiService";
import ProductCard from "../components/ProductCard";
import TokenManager from "../apiService/TokenManager";

function OrderDetails(){
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    function handleGet() {
        debugger;
        getProductsByOrderId(id)
          .then((data) => {
            setProducts(data.products);
          })
          .catch((error) => {
            setError(error);
          });
    }

    useEffect(() => {
        handleGet();
      }, [id]);


    return(
        <div>
            <AppHeader />
            <h1>Order Details</h1>
            <div className="row mt-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default OrderDetails;