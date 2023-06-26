import './Login.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  
    const registerUser = async (e) => {
      e.preventDefault();
      console.log("Email: ", email);
      console.log("Password: ", password);
      const response=await fetch('http://localhost:4000/api/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          email,
          password
        })
      })
      const data=await(response.json())
      console.log(data)
      if(data.user){
        localStorage.setItem('token',data.user)
        alert("Login successful")
        window.location.href='/dashboard'
      }else{
        alert("Login failed please check username or password")
      }
    };
    return (
      <div className="App">
        <h1>Login</h1>
      <form class="narrow-form" onSubmit={registerUser}>
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
          Login
        </button>
      </form>
      </div>
    );

}
 
export default Login;