import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaMobileAlt,
  FaTshirt,
  FaTv,
  FaLaptop,
  FaHeadphones
} from "react-icons/fa";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://ekart-shopping-app.onrender.com"
      );

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const productExists =
      existingCart.find(
        (item) => item.id === product.id
      );

    if (productExists) {
      productExists.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Product Added To Cart");
  };

  const filteredProducts = products.filter((item) => {

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">

      <h2 className="home-title">
        Latest Products
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-buttons">

        <button onClick={() => setCategory("All")}>
          <FaHome />
          <span>All</span>
        </button>

        <button onClick={() => setCategory("Mobile")}>
          <FaMobileAlt />
          <span>Mobile</span>
        </button>

        <button onClick={() => setCategory("Fashion")}>
          <FaTshirt />
          <span>Fashion</span>
        </button>

        <button onClick={() => setCategory("Electronics")}>
          <FaTv />
          <span>Electronics</span>
        </button>

        <button onClick={() => setCategory("Computers")}>
          <FaLaptop />
          <span>Computers</span>
        </button>

        <button onClick={() => setCategory("Accessories")}>
          <FaHeadphones />
          <span>Accessories</span>
        </button>

      </div>

      <div className="product-container">

        {filteredProducts.map((item) => (

          <Link
            to={`/product/${item.id}`}
            className="product-link"
            key={item.id}
          >

            <div className="product-card">

              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.title}
              />

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <h4>₹ {item.price}</h4>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
              >
                Add To Cart
              </button>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Home;