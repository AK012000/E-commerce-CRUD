import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addproduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let response = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
    });
    const result = await response.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid Name</span>
      )}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid Price</span>
      )}
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid Input</span>
      )}
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid Company</span>
      )}
      <button onClick={addproduct} className="appbutton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
