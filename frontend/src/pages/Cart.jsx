import { useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1
          }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item.id !== id);

    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <h2>My Cart</h2>

      {cart.length === 0 ? (

        <h3>Add items to your cart</h3>

      ) : (

        <div className="cart-container">

          {cart.map((item) => (

            <div
              className="cart-card"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="cart-details">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <h4>₹ {item.price}</h4>

                <div className="quantity-box">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          <div className="total-box">

            <h2>
              Total: ₹ {totalPrice}
            </h2>

            <Link to="/checkout">

              <button className="checkout-btn">
                Proceed To Checkout
              </button>

            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;