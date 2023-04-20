import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Avatar, Button } from 'antd';


import { LogoutOutlined } from '@ant-design/icons';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
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
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [post, setpost] = useState([]);
  const [id, setid] = useState([]);

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
            setusername(res.data.profile.username);
            setemail(res.data.profile.email);
            setimage(res.data.profile.profilePicture.imageSecURL);
            setrole(res.data.profile.role);
            setid(res.data.profile._id);

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
                    <NavItem eventKey="Guidlines">
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

              <div style={{ paddingTop: '5vh', paddingLeft: '5vh' }}>
                <div style={{ float: 'right', paddingRight: '4vh' }}>
                  <Button danger onClick={() => onDelete(id)}>Delete Profile</Button>
                </div><br />

                <h6>Login email : {email}</h6>
              </div>
              <div style={{ paddingLeft: '3vh', paddingTop: '15vh' }}>

                <Row>
                  <Col span={8}>
                    <div style={{ paddingLeft: '2vh' }}>
                      <Card hoverable bordered={false} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', height: '25vh' }}>
                        <center><h4><b>Total Guilines</b></h4></center>
                        <br />                        <br />

                        <center><h5>Count - {postsize} </h5></center>
                      </Card></div>

                  </Col>

                  <Col span={8}>
                    <div style={{ paddingLeft: '2vh', paddingRight: '2vh' }}>
                      <a href="/report"><Card hoverable bordered={false} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', height: '25vh' }}>
                        <br />
                        <br />

                        <center><h4><b>REPORT</b></h4></center>
                      </Card></a></div>

                  </Col>
                </Row>
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

export default Home;
