import React from "react";
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar/>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 classname="fs-5 text-center mb-0">Contact Us</h3>
              <h1 classname="display-6 text-center mb-4">
                Have Some <b>Questions?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src="assets/contactus.jpg"
                alt="Contact"
                className="w-75"
              />
            </div>
            <div className="col md-6">
              <form action="">
              <div class="mb-3">
                  <label for="mail" class="form-label">
                    Your Mail
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="mail"
                    placeholder="kamal@gmail.com"
                  />
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Kamal Sunimal"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Your Message
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" className="btm btn-outline-primary" >Send 
                Message<i classname="fa fa-paper-plane ms-2 w-100"></i> </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Contact;
