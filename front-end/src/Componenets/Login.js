import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/');
    }
  })

  const handleLogin = async()=>{
    console.log(email,password)
    const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
      console.log( result);
      if(result.auth){
      localStorage.setItem('user',JSON.stringify(result.user))
      localStorage.setItem('token',JSON.stringify(result.auth))    
      navigate('/')
      }else{ 
        alert("Please enter correct details")
      }

  }
    return (
    <div className='login'> 
    <h1>Login Page</h1>
        <input type='text' className='inputBox' placeholder='Enter your email'
        onChange={(e)=>setEmail(e.target.value)} value={email}
        />
        <input type='password' className='inputBox' placeholder='Enter your password'
        onChange={(e)=>setPassword(e.target.value)} value={password}
        />
        <button onClick={handleLogin} className='appbutton' type='button'>Login</button>
    </div>
  )
}

export default Login