import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
        <Navbar/>
        <section id="home">
            <div className='container '>
                <div className='row justify-content-center'>
                    <div className='col-md-8 mt-5'>
                    <h1 className='display-4 fw-bolder mb-4 text-center text-white'>Weather Forecast</h1>
                    <p className='lead text-center fs-4 mb-5 text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam cumque debitis temporibus itaque in quo laudantium eum vel totam consectetur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum at earum ipsum deleniti. Dolorum illum quos ipsum reiciendis nisi fuga illo amet deserunt assumenda omnis, laudantium sunt? Provident, quae sunt!</p>
                    <div className='buttons d-flex justify-content-center'>
                        <NavLink to ="/Maindash" className='btn btn-light me-4 rounded-pill px-4 py-2 '>Dashboard</NavLink >
                        <NavLink to ="/contact" className='btn btn-light me-4 rounded-pill px-4 py-2 '>Contact Us</NavLink >
                    </div>
                    </div>
                </div>
            </div>
        </section>
    
    </div>
  );
}

export default Home;