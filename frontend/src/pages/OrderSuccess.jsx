import "./OrderSuccess.css";
import { Link } from "react-router-dom";

function OrderSuccess() {

  return (

    <div className="success-page">

      <div className="success-card">

        <h1>✅</h1>

        <h2>
          Order Placed Successfully
        </h2>

        <p>
          Thank you for shopping with us.
        </p>

        <Link to="/">

          <button>
            Continue Shopping
          </button>

        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;