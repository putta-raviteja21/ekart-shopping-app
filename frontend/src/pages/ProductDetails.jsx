import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try{

      const res = await axios.get(
        `https://ekart-shopping-app.onrender.com`
      );

      const singleProduct =
        res.data.find((item) =>
          item.id == id
        );

      setProduct(singleProduct);

    }

    catch(error){
      console.log(error);
    }

  };

  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Product Added To Cart");
  };

  if(!product){
    return <h2>Loading...</h2>;
  }

  return (

    <div className="details-page">

      <div className="details-card">

        <img
          src={product.image}
          alt={product.title}
        />

        <div className="details-info">

          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <h3>₹ {product.price}</h3>

          <h4>
            Category:
            {product.category}
          </h4>

          <button onClick={addToCart}>
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;