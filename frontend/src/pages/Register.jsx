import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data);

      navigate("/");

    }

    catch(error){
      console.log(error);
    }

  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <div className="auth-left">

          <h2>Looks like you're new here!</h2>

          <p>
            Sign up to get access to your orders,
            wishlist and recommendations.
          </p>

        </div>

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <h2>Register</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />

            <button type="submit">
              Register
            </button>

            <p className="auth-link">
              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;