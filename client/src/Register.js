import './Login.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  
    const registerUser = async (e) => {
      e.preventDefault();
      console.log("Name: ", name);
      console.log("Email: ", email);
      console.log("Password: ", password);
      const response=await fetch('http://localhost:4000/api/register',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          name,
          email,
          password
        })
      })
      const data=await(response.json())
      console.log(data)
      if(data.status === 'ok'){
        console.log("user logined successfully")
        navigate('/login')
    }
    };
    return (
      <div className="App">
        <h1>Register</h1>
      <form class="narrow-form" onSubmit={registerUser}>
        <div class="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br/>
        <div class="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br/>
  
        <div class="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br/>
  
        <button type="submit" class="btn btn-primary">
          Register
        </button>
      </form>
      </div>
    );

}
 
export default Login;