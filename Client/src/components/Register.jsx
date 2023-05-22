import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar';
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState("");
    const regex = /\S+@\S+\.\S+/;
    const loginHandler = async (e) => {

      e.preventDefault();
      if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 ) {
          setTimeout(() => {
              setError("");
          }, 5000);
          return setError("Please fill all the fields");
      } else if (password.trim().length < 6) {
          setTimeout(() => {
              setError("Time Out");
          }, 5000);
          return setError("Please use a valid password with at least 6 characters");
      }
      else if (!email.trim().match(regex)) {
          setTimeout(() => {
              setError("Time Out");
          }, 5000);
          return setError("Please provide valid email");
      }

      else {

          let postObject = { email, password, username };

          await axios
              .post("http://localhost:3001/auth/reg", postObject)
              .then((res) => {
                  localStorage.setItem("authToken", res.data.token);
                  window.location = `/main`;
              })
              .catch((err) => {
                  setError(err.response.data.desc);
                  setTimeout(() => {
                      setError("");
                  }, 5000);
              });
      }

  };

  return (
    <div>
      <Navbar/>
        <div className="container shadow my-5">
        <div className='row justify-content-end'>
          <div className="col-md-5 d-flex flex-column align-items-center
          text-white justify-content-center form order-2">
            <h1 className='display-4 fw-bolder'> Hello User</h1>
            <p></p>
            <p></p>
          
            <p className='lead text-center'>Enter Your Details to Register</p>
            <h5 className='mb-4'>OR</h5>
            <NavLink to="/Login" className="btn btn-out-light rounded-pill pb-2 w-50">Login</NavLink>

          </div>
          <div className='col-md-6 p-5'>
            <h1 className='display-6 fw-bolder mb-5'>REGISTER</h1>
            <form onSubmit={loginHandler}>
            {error && <span  style={{ color: "red" }}>{error}</span>}

              <div className="mb-3">
              <label for="email" class="form-lable">
                Email
               </label>
                <input type="email" className="form-control" id="email" 
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-3">
               <label for="name" class="form-lable">
                Username
               </label>
                <input 
                type="text" className="form-control" id="name" 
                onChange={(e) => setusername(e.target.value)}
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;