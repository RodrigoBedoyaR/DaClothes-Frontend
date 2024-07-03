import levis from "/src/assets/Levis_505_Front.jpg";
import { deleteProduct } from "../apiService/apiService";
import { Link } from "react-router-dom";
import TokenManager from "../apiService/TokenManager";

function ProductCard({ product }) {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4" key={product.id}>
        <div className="card h-100 mx-auto" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={levis}
            alt="picture"
            style={{ objectFit: "cover", height: "200px" }}
          />
          <div className="card-body">
            <h5 className="card-title truncateText">{product.name}</h5>
            <p className="card-text truncateText">{product.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item truncateText">
              Size: {product.size}
            </li>
            <li className="list-group-item truncateText">
              Brand: {product.brand}
            </li>
            <li className="list-group-item truncateText">{product.price}€</li>
          </ul>
          <Link
            to={`/product/${product.id}`}
            state={product.id}
            className="btn btn-primary"
          >
            See more
          </Link>
          {product.username.id === TokenManager.getClaims()?.userId && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  deleteProduct(product.id);
                  alert("Product deleted");
                  window.location.reload();
                }}
              >
                Delete
              </button>
              <Link
                to={`/updateProduct/${product.id}`}
                state={product.id}
                className="btn btn-primary"
              >
                Update
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default ProductCard;
