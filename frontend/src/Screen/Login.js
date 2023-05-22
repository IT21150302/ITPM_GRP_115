import React, { useState } from "react";
import { Form, Col, Row, Button, Card, Image } from "react-bootstrap";
import axios from "axios";


const Login = () => {




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
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
        .post("http://localhost:6500/api/auth/login", postObject)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
          window.location = `/home`;
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
      <Row>
      <Col sm={8} style={{ backgroundColor: "#5791b3" }}>
          <div style={{ backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1678947146/Surge/ggggggssssssssssssggg_ibx4n2_copy_tuzhji.png"})` ,backgroundRepeat:"no-repeat" }}>

         <div style={{ paddingTop: "20vh", paddingBottom: "19vh", paddingLeft: "5vh"  }}>
            <Card border="dark" style={{ width: '48rem' }}>
              <Card.Body>
                <Form onSubmit={loginHandler}>
                  {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}
                  <div style={{ paddingLeft: "40%" }}>
                    <Image style={{ width: "21vh", height: "20vh" }}
                      src=
                      "https://cdn.dribbble.com/users/470545/screenshots/4339126/fish-animation_v1.gif"
                      roundedCircle
                    />
                  </div>
                  <br/>
                  <Form.Group as={Col} md={12} controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={12} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div style={{ paddingTop: "3vh" }}>
                    <Form.Group as={Col} md={12} className="login-btn">
                      <div className="d-grid gap-2">
                      <Button style={{ backgroundColor: "#5791b3",border:"#5791b3" }} type="submit"  >
                        Login
                        </Button>
                        <Row>
                          <Col>
                          <div>
                          Are You a Vendor? <a href="/vhome"  style={{color:"#5791b3"}}>Login as Vendor</a>
                          </div>
                          </Col>
                          <Col>
                          
                          <div style={{paddingLeft:"10vh"}}>
                            Do not have an account  <a href="/register" style={{color:"#5791b3"}}>Register Here</a>
                          </div>
                          
                          </Col>
                        </Row>
                      </div>

                    </Form.Group>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <br />
          </div>


         </div>
          
        </Col>
        <Col sm={4}>
        <div style={{paddingTop:'2vh'}}>
        <a href="/products">
        <Button style={{backgroundColor: '#5791b3',border:'#5791b3'}}>Products Availabe Today</Button>
        </a>

        </div>

          <div style={{ paddingTop: "15vh", paddingRight: "3vh" }}>
          <h3 style={{color:"#1F456E"}}>Hello! </h3>

          <h2 style={{color:"#1F456E"}}>Welcome Back...</h2>
            <h1 style={{color:"#1F456E"}}>Login</h1>
       <div style={{paddingLeft:'30vh',paddingTop:'30vh'}}>
        <img src="https://res.cloudinary.com/iplus/image/upload/v1678947146/Surge/greyfish_wsyrxs.png" style={{width:'120%'}} alt="fish"/>
       </div>
          </div>
        </Col>
      </Row>

    </div>




  );
};

export default Login;