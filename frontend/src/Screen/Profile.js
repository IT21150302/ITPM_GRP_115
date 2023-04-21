import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Avatar, Button } from 'antd';
import { Form,Modal } from "react-bootstrap";


import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import "./style.css";

const Profile = () => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    let hasToken;
    if (localStorage.getItem("authToken")) {
        hasToken = localStorage.getItem("authToken");
    }
    const [image, setimage] = useState("");
    const [fullname, setusername] = useState("");
    const [email, setemail] = useState("");
    const [role, setrole] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [post, setpost] = useState([]);
    const [id, setid] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (
    ) => {
      setShow(true);
      
    }
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
    };

    //delete profile funtion
    function onDelete(_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        console.log(_id);
        axios.delete("http://localhost:6500/api/profile/deleteprofile/" + _id, config).then((res) => {
            alert('Deleted Successfully');
            window.location = `/`;
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        updateProfile(e)
      };

  //Edit Profile
  function updateProfile() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const newTime = {
        email,
        fullname,
        phone,
        city,
        address
    }

    axios.put("http://localhost:6500/api/profile/updateprofile/" + id, newTime, config).then(() => {
        setemail(email);
        setusername(fullname);
        setphone(phone);
        setcity(city);
        setaddress(address);
      alert("Updated Successfully");
      window.location.reload();
    }).catch((err => {
      alert(err)
    }))

  }
    useEffect(() => {

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
                        setusername(res.data.profile.fullname);
                        setemail(res.data.profile.email);
                        setimage(res.data.profile.profilePicture.imageSecURL);
                        setrole(res.data.profile.role);
                        setid(res.data.profile._id);
                        setaddress(res.data.profile.address);
                        setcity(res.data.profile.city);
                        setphone(res.data.profile.phone);
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
    }, []);

    const postsize = post.length;
    console.log(postsize);




    return (
        <>

            <div >

                {hasToken && (<div>

                    <Row>
                        <Col span={6} style={{
                            backgroundColor: "#b5d1e2", paddingBottom: '20%', background: '#b5d1e2',
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


                            <div style={{ paddingLeft: '5vh', paddingTop: '3vh' }}>
                                <h3><b>Account</b></h3>
                                <h6>Profile Picture</h6>
                                <div style={{ paddingLeft: "1%", paddingTop: "1%", paddingBottom: '2%' }}>
                                    <Avatar size={140} icon={<img src={image} alt="post" />} />
                                </div>
                                <Form >


                                    <Form.Group as={Col} md={12} controlId="name">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder="name"
                                            value={fullname}
                                        />
                                    </Form.Group>
                                </Form>




                            </div>
                            <br />

                            <div style={{ paddingLeft: '5vh', paddingTop: '3vh' }}>
                                <h3><b>Personal Information</b></h3>
                                <Row>
                                    <div style={{ paddingRight: '1vh' }}>

                                        <Col>

                                            <Form >
                                                <Form.Group as={Col} controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="email"
                                                        value={email}
                                                    />
                                                </Form.Group><br />

                                                <Form.Group as={Col} controlId="phone">
                                                    <Form.Label>Contact Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="phone"
                                                        value={phone}
                                                    />
                                                </Form.Group><br />
                                            </Form>
                                        </Col>
                                    </div>
                                    <Col>
                                        <Form >
                                            <Form.Group as={Col} controlId="address">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="address"
                                                    value={address}
                                                />
                                            </Form.Group><br />

                                            <Form.Group as={Col} controlId="city">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="city"
                                                    value={city}
                                                />
                                            </Form.Group><br />
                                        </Form>
                                    </Col>
                                </Row>

                            </div>
                            <br />

                            <div style={{ paddingTop: '5vh', paddingLeft: '5vh' }}>
                                <div style={{ float: 'right', paddingRight: '4vh' }}>
                                    <Button primary onClick={() => handleShow()}>Edit</Button>
                                     &nbsp;   
                                    <Button danger onClick={() => onDelete(id)}>Delete Profile</Button>
                                </div>
                                <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE PROFILE</b></Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <Form >

                <div >
                  <Form.Label>Email :</Form.Label>
                  <Form.Control placeholder="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}  disabled/>
                </div>

                <div >
                  <Form.Label>Full Name : </Form.Label >
                  <Form.Control placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setusername(e.target.value)} />
                </div>

                <div >
                  <Form.Label>Contact Number:</Form.Label >
                  <Form.Control placeholder="phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)} />
                </div>

                <div >
                  <Form.Label>City :</Form.Label>
                  <Form.Control placeholder="city"
                    value={city}
                    onChange={(e) => setcity(e.target.value)} />
                </div>

                <div >
                  <Form.Label>Address :</Form.Label>
                  <Form.Control placeholder="address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)} />
                </div>

                <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                  <Button  type="submit" onClick={(e) => updateUser(e)}>Update</Button>
                  {' '}<Button type="primary" danger onClick={handleClose}>
                    Close
                  </Button>
                </div >

              </Form>
            </Modal.Body>

          </Modal>
                            </div>

                        </Col>

                    </Row>

                </div>)}
                {!hasToken && (<div>
                    <a href="/">
                        Time Out Login again from here ...
                    </a>
                </div>)}

            </div>
        </>
    );
};

export default Profile;
