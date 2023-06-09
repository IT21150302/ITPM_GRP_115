import React, { useState, useEffect } from "react";
import { Form, Col, Button, Card, Row } from "react-bootstrap";
import axios from "axios";
import FileBase from "react-file-base64";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileEnc, fileEncData] = useState(null);
  const [username, setusername] = useState("");
  const [role, setrole] = useState("");
  const [error, setError] = useState("");
  const regex = /\S+@\S+\.\S+/;

  

  const loginHandler = async (e) => {

    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0 ||  username.trim().length === 0 || fileEnc.trim().length === 0) {
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

      let postObject = { email, password, fileEnc, role, username };

      await axios
        .post("http://localhost:6500/api/auth/reg", postObject)
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
    <div >
      <Row >
        <Col sm={8} style={{ backgroundColor: "#5791b3" }}>
          <div style={{ backgroundImage: `url(${"https://res.cloudinary.com/iplus/image/upload/v1678947146/Surge/ggggggssssssssssssggg_ibx4n2_copy_tuzhji.png"})` ,backgroundRepeat:"no-repeat" }}>

            <div style={{ paddingTop: "13vh", paddingBottom: "15vh", paddingLeft: "15vh" }}>
              <Card border="dark" style={{ width: '48rem' }}>
                <Card.Body>
                  <Form onSubmit={loginHandler}>
                    {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}


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

                    <Form.Group as={Col} md={12} controlId="username">
                      <Form.Label>username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="username"
                        minLength={6}
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md={12} controlId="role">
                      <Form.Label>role</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="role"
                        minLength={6}
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="fileupload">
                      <Form.Label>Profile Picture</Form.Label>
                      <h6>**Please do not exceed the amount of file size 25MB </h6>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                          fileEncData(base64);
                        }}
                      />
                    </Form.Group>
                    <div>
                      <div className="container">
                        <div className="form-group">
                          

                          

                        </div>
                      </div>
                    </div>
                    <div>
                      <br />

                      <Form.Group as={Col} md={12} className="login-btn">
                        <div className="d-grid gap-2">
                          <Button style={{ backgroundColor: "#5791b3",border:"#5791b3" }} type="submit"  >
                            Register
                          </Button>
                          <Row>
                            <Col></Col>
                            <Col>
                              <div style={{ paddingLeft: "18vh" }}>
                                Have an account  <a href="/" style={{ color: "#5791b3" }}>Login Here</a>
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
          <div style={{ paddingTop: "30vh", paddingRight: "3vh" }}>
            <h1 style={{ color: "#043e7d" }}>Welcome!</h1>
            <h3 style={{ color: "#043e7d" }}>~ Register ~</h3>
            <h3 style={{ color: "#043e7d" }}>Join With Us ..</h3>
          </div>
        </Col>
      </Row>



    </div>



  );
};

export default Register;