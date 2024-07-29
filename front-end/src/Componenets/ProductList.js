import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProduct(result);
  };
  console.log("product", product);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      alert("record deleted");
    }
  };
 
  const searchHandle = async(e)=>{
   let key = e.target.value
  if(key){  
   let result = await fetch(`http://localhost:5000/search/${key}`,{
    headers:{
      authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  })
  result = await result.json()
  if(result){
    setProduct(result)
  }}else{
    getProducts()
  }
  }

  return (
    <div className="product-list">
      <h1>ProductList</h1>
      < input type="text"  className="search-product-box"  placeholder="Search Product" 
      onChange={searchHandle}
      />
      <ul>
        <li>S.No.</li>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Operations</li>
      </ul>

      {
      product.length>0 ? product.map((value, index) => (
        <ul key={value._id}>
          <li>{index + 1}</li>
          <li>{value.name}</li>
          <li>{value.category}</li>
          <li>{value.price}</li>
          <li>
            <button onClick={() => deleteProduct(value._id)}>Delete</button>
            <Link to = {'/update/'+value._id}>Update</Link>
          </li>
        </ul>
      )) :<h1>No Result Found</h1>
    }
    </div>
  );
};

export default ProductList;
