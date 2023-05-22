import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
        setTimeout(() => {
            setError("");
        }, 5000);
        return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
        setTimeout(() => {
            setError("");
        }, 5000);
        return alert("Please use a valid password");
    } else {
        let postObject = { email, password };

        await axios
            .post("http://localhost:3001/auth/login", postObject)
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
        <div className='row'>
          <div className="col-md-5 d-flex flex-column align-items-center
          text-white justify-content-center form">
            <h1 className='display-4 fw-bolder'>Welcome Back</h1>
            <p></p>
            <p></p>
          
            <p className='lead text-center'>Enter Your Credentials To Login</p>
            <h5 className='mb-4'>OR</h5>
            <NavLink to="/register" className="btn btn-out-light rounded-pill pb-2 w-50">Register</NavLink>

          </div>
          <div className='col-md-6 p-5'>
            <h1 className='display-6 fw-bolder mb-5'>LOGIN</h1>
            <form onSubmit={login}>
            {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
             onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
