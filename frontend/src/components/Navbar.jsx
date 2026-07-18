import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        <Link to="/">
          E-Kart
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="search"
      />

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="register-btn">
            Register
          </button>
        </Link>

      </div>

      <Link to="/cart" className="cart-link">
        <FaShoppingCart />
        <span>Cart</span>
      </Link>

    </div>
  );
}

export default Navbar;