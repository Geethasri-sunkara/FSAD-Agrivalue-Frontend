import React, { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    sold: 0
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        alert("Product Added Successfully");

        setProduct({
          name: "",
          price: "",
          quantity: "",
          image: "",
          sold: 0
        });
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;