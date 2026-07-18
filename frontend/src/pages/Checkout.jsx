import { useState } from "react";
import axios from "axios";
import "./Checkout.css";

function Checkout() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const placeOrder = async () => {

    try {

      await axios.post(
        "https://ekart-shopping-app.onrender.com",
        {
          customer_name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
          products: cart,
          total_price: totalPrice
        }
      );

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      window.location.href = "/success";

    }

    catch (error) {

      console.log(error);

      alert("Order Failed");

    }

  };



  return (

    <div className="checkout-page">

      <div className="checkout-container">

        <div className="address-section">

          <h2>Delivery Address</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
          />

        </div>


        <div className="summary-section">

          <h2>Order Summary</h2>

          {

            cart.map((item) => (

              <div
                className="summary-item"
                key={item.id}
              >

                <p>

                  {item.title}

                  ×

                  {item.quantity}

                </p>

                <h4>

                  ₹ {item.price * item.quantity}

                </h4>

              </div>

            ))

          }

          <hr />

          <h2>

            Total : ₹ {totalPrice}

          </h2>

          <button onClick={placeOrder}>

            Place Order

          </button>

        </div>

      </div>

    </div>

  );

}

export default Checkout;