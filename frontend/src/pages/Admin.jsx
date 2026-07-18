import { useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {

  const [formData, setFormData] = useState({

    brand: "",
    model: "",
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    rating: ""

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

      await axios.post(
        "https://ekart-shopping-app.onrender.com",
        formData
      );

      alert("Product Added Successfully");

      setFormData({

        brand: "",
        model: "",
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        rating: ""

      });

    }

    catch(error){
      console.log(error);
    }

  };

  return (

    <div className="admin-page">

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <h2>Add Product</h2>

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
}

export default Admin;