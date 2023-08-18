import  { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Header from './Header'
function Register(){
  const history=useNavigate();
  useEffect(()=>{
      if(localStorage.getItem('user-info')){
        history('/add');
      }
  },[history])
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  

  async function signup(){
    let item= {name,password,email}
    // console.log(item);
   let result = await fetch("http://127.0.0.1:8000/api/register",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
    result = await result.json();
    if(result.success==true){
      localStorage.setItem('user-info',JSON.stringify(item));
      history("/add")
      console.log(result);
  }
   
  }
  return (
    <div>
      <Header />
    <div className="col-sm-6 offset-sm-3">
      <h1 className="col-sm-6 offset-sm-4">Register Page</h1>
      <input type="text" value={name}onChange={(e)=>setName(e.target.value)}className="form-control md-6" placeholder="Name"/><br />
      <input type="password"  value={password}onChange={(e)=>setPassword(e.target.value)} className="form-control md-6" placeholder="Password"/><br />
      <input type="text" value={email}onChange={(e)=>setEmail(e.target.value)} className="form-control md-6" placeholder="Email"/><br />
      <button onClick= {signup} type="submit" className="col-sm-3 offset-sm-5 btn btn-primary">Sign Up</button>
    </div>
    </div>
  )
}

export default Register