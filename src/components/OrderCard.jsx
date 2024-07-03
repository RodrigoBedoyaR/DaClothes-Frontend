import { Link } from "react-router-dom";


function OrderCard({order}){
    const createdAt = new Date(order.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const id = order.id;

    return (
        <>
          <div className="col-12 col-md-6 col-lg-3 mb-4" key={order.id}>
            <div className="card h-100 mx-auto" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title truncateText">Order number: {order.id}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item truncateText">
                  Total price: {order.totalPrice}€
                </li>
                <li className="list-group-item truncateText">
                  Ordered at: {formattedDate}
                </li>
              </ul>
              <Link
                to={`/order/${id}`}
                state={id}
                className="btn btn-primary"
              >
                See more
              </Link>
            </div>
          </div>
        </>
      );
}

export default OrderCard;