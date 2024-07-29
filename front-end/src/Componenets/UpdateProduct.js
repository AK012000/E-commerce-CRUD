import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
       getProductDetails()
  },[])

  const getProductDetails = async()=>{
    console.warn(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    console.warn(result)
    setName(result.name)
    setCategory(result.category)
    setCompany(result.company)
    setPrice(result.price)
  }
  
  const updateproduct = async () => {
     console.log(name,price,company,category)  
     let result = await fetch(`http://localhost:5000/product/${params.id}`,{
     method:'put',
     body: JSON.stringify({name,price,company,category}), 
     headers: {
      'Content-Type' : 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
     })
     result = await result.json();
     console.warn(result);
     if(result){
      navigate('/')
     }
};
  return (
    <div className="product">
     
     <h1>Update Product</h1>

      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
     
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
     
      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
    
      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
     
      <button onClick={updateproduct} className="appbutton">
        Add Product
      </button>
    </div>
  );
};

export default UpdateProduct;
