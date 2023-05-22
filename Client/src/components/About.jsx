import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
  
    <div>
        <Navbar/>
        <section id="about">
            <div className='container my-5 py-5'>
                <div className="row">
                    <div className="col-md-6">
                        <img src='/aboutus.png' alt="About"
                        className='w-75 mt-5'/>
                    </div>
                    <div className='col-md-6'>
                    <h3 className='fs-5'>About Us</h3>
                    <h1 className='display-6'>Who <b>We </b>Are </h1>
                    <hr/>
                    <p className='lead mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. loream20 Non magni cum exercitationem possimus, explicabo maxime rerum dicta aliquid tempore quam ipsum perspiciatis, odio eum. In, numquam, debitis possimus magni cupiditate velit quo natus rem at molestiae nesciunt maxime asperiores fugit dignissimos aspernatur unde dolorem. Dolore cupiditate iste itaque a expedita?</p>
                    <p className='lead mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In ab illo sunt incidunt fugit laborum at velit, ipsa, veritatis iste unde aperiam vero, eum harum corporis laudantium maxime pariatur odit? Blanditiis debitis repudiandae, eum recusandae possimus fugiat quas dolore consectetur adipisci maiores nesciunt sequi impedit velit amet repellendus odio corporis excepturi dolorem non perspiciatis quibusdam quisquam? Quia expedita cupiditate ea voluptatem sit eos, minima quibusdam quisquam sed aut ullam minus fugit repellendus numquam maiores corrupti obcaecati. Facilis quo molestias architecto quasi? Praesentium blanditiis incidunt laudantium vitae ut et quas veniam accusamus nulla quo, sed provident sint delectus ad pariatur ea?</p>
                </div>
                </div>
            </div>
        </section>
        
    </div>
    
  )
}

export default About;
