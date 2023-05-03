import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'antd';
import { Button, Modal, Form, Alert } from "react-bootstrap";

import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";
import { Radio, RadioGroup } from 'react-radio-group'

import axios from "axios";
import Post from "./Post";

export default function Guideline() {

  const [isHover, setIsHover] = useState(false);
  const [_id, setid] = useState(" ");
  const [uemail, setemails] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [uploads, setuploads] = useState("");
  const [fileEnc, fileEncData] = useState(" ");
  const [post, setpost] = useState([]);
  const [error, setError] = useState("");
  const [postadd, setpostadd] = useState("");
  const [shows, setShows] = useState(false);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [uusername, setusernames] = useState("");
  const [user, setuser] = useState("");
  const [ema, setema] = useState("");
  const { Meta } = Card;

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
  const handleShow = (_id, name, uploads, description,
  ) => {
    setShow(true);
    setid(_id);
    setname(name);
    setuploads(uploads);
    setdescription(description);

  }


  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    window.location = "/";
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  //delete profile funtion
  function onDelete(_id) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    console.log(_id);
    axios.delete("http://localhost:6500/api/profile/deletepost/" + _id, config).then((res) => {
      alert('Deleted Successfully');
      window.location = `/guidline`;
    }).catch((err) => {
      alert(err.message);
    })
  }

  useEffect(() => {



    //get funtion
    const getpost = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/api/profile/getpost",
            config
          )

          .then((res) => {
            console.log(res.data.allpost);
            setpost(res.data.allpost);



          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };

    const GetProfile = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/api/profile/profile/",
            config
          )

          .then((res) => {
            console.log(res.data.profile);
            setid(res.data.profile._id);
            setemails(res.data.profile.email);
            setusernames(res.data.profile.username);
            setema(res.data.profile.email);
            setuser(res.data.profile.username);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    GetProfile();
    getpost();
  }, [])

  //Add Post
  function sendData(e) {
    e.preventDefault();
    if (name.trim().length === 0 || description.trim().length === 0 || fileEnc.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const email = ema
    const username = user
    const newProducr = {
      name,
      uploads,
      description,
      email,
      username,
      fileEnc,
    }

    axios.post("http://localhost:6500/api/profile/createpost", newProducr, config).then(() => {
      ("Product added")

      setemails('');
      setusernames('');
      fileEncData('');
      setname('');
      setdescription('');
      setuploads('');
      setpostadd("post added ..");


      window.location.reload();

    }).catch((err) => {
      setpostadd("error");
    })
  }
  //Update Post
  function update() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const newTime = {
      name,
      uploads,
      description,
    }

    axios.put("http://localhost:6500/api/profile/updatepost/" + _id, newTime, config).then(() => {
      setname(name);
      setuploads(uploads);
      setdescription(description);
      alert("Updated Successfully");
      window.location.reload();
    }).catch((err => {
      alert(err)
    }))

  }
  const updateUser = (e) => {
    e.preventDefault();
    update(e)
  };
  return (
    <div>
      <center></center>
      <Row>
        <Col span={6} style={{
          backgroundColor: "#b5d1e2", paddingBottom: '110%', background: '#b5d1e2',
        }}>

          <SideNav style={{
            background: '#b5d1e2',
          }}
          >

            <div style={{ paddingTop: '3vh', paddingLeft: '5vh' }}>

              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/home",
                }}
              >
                <NavItem eventKey="home">
                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
                    >
                      Dashboard
                    </div>
                  </NavIcon>

                </NavItem>
              </Link><br />
              
              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "",
                }}
              >
                <NavItem eventKey="support">
                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
                    >
                      Support
                    </div>
                  </NavIcon>

                </NavItem>
              </Link><br />
              
              <br /><br />

              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/profile",
                }}
              >
                <NavItem eventKey="profile">
                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
                    >
                      Profile
                    </div>
                  </NavIcon>

                </NavItem>
              </Link><br />
              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/guidline",
                }}
              >
                <NavItem eventKey="Permits and Licence">
                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}

                    >
                      Guidelines
                    </div>
                  </NavIcon>

                </NavItem>
              </Link><br />


              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/report",
                }}
              >
                <NavItem eventKey="Reports">
                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}

                    >
                      Reports</div>
                  </NavIcon>

                </NavItem>
              </Link><br />

              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/setting",
                }}
              >
                <NavItem eventKey="Settings">

                  <NavIcon>
                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
                    >
                      Settings</div>
                  </NavIcon>

                </NavItem>
              </Link><br />

              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                onClick={logOutHandler}
              >
                <NavItem eventKey="Settings">

                  <NavIcon>
                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
                    >
                      Logout</div>
                  </NavIcon>

                </NavItem>
              </Link><br />


            </div>
          </SideNav>
        </Col>


        <Col span={18}   >

          <div style={{ paddingLeft: '3vh' }} >

            <div style={{ paddingTop: '2vh' }}>

              <h4><b>Guidelines</b></h4>
              <Row><center>
                <Col>
                  <video autoPlay muted loop style={{ width: '47%', paddingLeft: '2px' }} >
                    <source
                      src="https://res.cloudinary.com/iplus/video/upload/v1679238049/stock-footage-colorful-siamese-elephant-ear-fighting-fish-betta-splendens-also-known-as-thai-fighting-fish-or_moa2y7.webm"
                      type="video/mp4"
                    />
                  </video>

                  <video autoPlay muted loop style={{ width: '47%', paddingTop: '2px' }} >
                    <source
                      src="https://res.cloudinary.com/iplus/video/upload/v1679238603/1061714161-preview_i4rin3.mp4"
                      type="video/mp4"
                    />
                  </video>
                </Col>
                </center> 
              </Row>
              <br />
              <div style={{ paddingRight: '5vh', float: 'right' }}>
                <Button onClick={handleShows} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)' }}>
                  ADD NEW POST
                </Button>
                <Modal show={shows} onHide={handleCloses} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title> <span class="divider2" /> &nbsp; <b>ADD NEW POST</b></Modal.Title>

                  </Modal.Header>
                  <Form onSubmit={sendData}>
                    {postadd && <Alert variant="info"  >
                      {postadd}</Alert>}
                    {error && <span className="error-message" style={{ color: "blue" }}>{error}</span>}

                    <div style={{ paddingTop: '2vh', paddingLeft: '2vh', paddingRight: '2vh', paddingBottom: '2vh' }}>
                      <div >
                        <Form.Label>Name :</Form.Label>
                        <Form.Control placeholder="name"
                          onChange={(e) => setname(e.target.value)} />
                      </div>

                      <div >
                        <Form.Label>Description : </Form.Label >
                        <Form.Control placeholder=" description" as="textarea" rows={3}
                          onChange={(e) => setdescription(e.target.value)} />
                      </div><br />
                      <Form.Label>Upload as : </Form.Label >

                      <RadioGroup name="Upload" onChange={(e) => setuploads(e)}>
                        <div className="radio-button-background">
                          <Radio value="Post" className="radio-button" />Post
                        </div>
                        <div className="radio-button-background">
                          <Radio value="Top Story Headline" className="radio-button" />Top Story Headline
                        </div>

                      </RadioGroup>
                      <br />

                      <Form.Group controlId="fileupload">
                        <Form.Label>Choose File</Form.Label>
                        <h6>**Please do not exceed the amount of file size 25MB </h6>
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) => {
                            fileEncData(base64);
                          }}
                        />
                      </Form.Group>

                      <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                        <Button style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)', color: 'white' }} variant="warning" type="submit" >ADD POST</Button>
                        {' '}<Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </div >

                    </div>

                  </Form>
                </Modal>
              </div><br />
              <br />
              <div style={{ paddingBottom: "1vh", paddingTop: "1vh", float: 'right', paddingRight: '5vh' }}>
                <input type="text" placeholder="Search  from 'Name' " className="mr-2"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }} />
              </div>
              <h4 style={{ paddingBottom: '4px' }}>Top Story Headline</h4>

              {post.filter(post => {

                if (search === "" && uemail === post.email) {
                  return post
                }
                else if (post.name.toLowerCase().includes(search.toLowerCase()) && uemail === post.email) {
                  return post
                }
              }).
                map((post) => {


                  return (

                    <div key={post._id}>

                      {(() => {
                        if (post.uploads === 'Top Story Headline') {
                          return (
                            <div style={{ paddingBottom: '1vh' }}>
                              <Card hoverable style={{ width: 1000 }}>
                                <Row>

                                  <Col span={9}>
                                    <img src={post.posttImage.imageSecURL} style={{ width: '40vh' }} />

                                  </Col>
                                  <Col span={15}>
                                    <h5>{post.name}</h5><br />
                                    <p>Description:</p>
                                    <textarea
                                      name="postContent"
                                      defaultValue={post.description}
                                      rows={4}
                                      cols={60}
                                      disabled
                                    />
                                    <h6>Added by :{post.email}</h6>

                                    <br />
                                    
                                    <Button variant="warning" onClick={() => handleShow(post._id, post.name, post.uploads, post.description, post.email)} >Edit</Button>

                                    &nbsp;
                                    <Button variant="danger" onClick={() => onDelete(post._id)}>Delete </Button>
                                  </Col>
                                </Row>
                              </Card>




                              <br />                            <br />

                            </div>
                          )
                        }
                      })()}


                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE POST</b></Modal.Title>

                        </Modal.Header>
                        <Modal.Body>
                          <Form >

                            <div >
                              <Form.Label>Name :</Form.Label>
                              <Form.Control placeholder="name"
                                value={name}
                                onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div >
                              <Form.Label>Upload Type : </Form.Label >
                              <Form.Control placeholder="uploads"
                                value={uploads}
                                onChange={(e) => setuploads(e.target.value)} disabled />
                            </div>

                            <div >
                              <Form.Label>Description :</Form.Label >
                              <Form.Control placeholder="description" as="textarea" rows={3}
                                value={description}
                                onChange={(e) => setdescription(e.target.value)} />
                            </div>

                            <div >
                              <Form.Label>Email :</Form.Label>
                              <Form.Control placeholder="email"
                                value={ema}
                                disabled />
                            </div>


                            <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                              <Button variant="warning" type="submit" onClick={(e) => updateUser(e)}>Update</Button>
                              {' '}<Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                            </div >

                          </Form>
                        </Modal.Body>

                      </Modal>

                    </div>
                  );
                })}

              <Post />


            </div>

          </div>
        </Col>

      </Row>



    </div>
  );
}