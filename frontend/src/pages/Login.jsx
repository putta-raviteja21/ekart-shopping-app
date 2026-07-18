import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const res = await axios.post(
        "https://ekart-shopping-app.onrender.com/api/auth/login",
        loginData
      );

      alert(res.data);

      if(res.data === "Login Successful"){
        navigate("/");
      }

    }

    catch(error){
      console.log(error);
    }

  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <div className="auth-left">

          <h2>Login</h2>

          <p>
            Get access to your Orders,
            Wishlist and Recommendations
          </p>

        </div>

        <div className="auth-right">

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <h2>Welcome Back</h2>

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
              Login
            </button>

            <p className="auth-link">

              New user?{" "}

              <Link to="/register">
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;