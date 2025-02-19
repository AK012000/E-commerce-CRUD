import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(()=>{
      const auth = localStorage.getItem("user");
      if(auth)
      {
          navigate('/')
      }
  })

  const collectData = async () => {
    console.log(name, email, password);
      const response = await fetch("http://localhost:5000/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const result = await response.json();
      console.log( result);
      localStorage.setItem('user',JSON.stringify(result.result)) 
      localStorage.setItem('token',JSON.stringify(result.auth))  
       if (result){
        navigate('/')
       }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectData} className="appbutton" type="button">
        SignUp
      </button>

    </div>
  );
};

export default SignUp;
