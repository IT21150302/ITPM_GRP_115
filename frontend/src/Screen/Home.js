import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Avatar, Button } from 'antd';


import { LogoutOutlined } from '@ant-design/icons';
import SideNav, {  NavItem, NavIcon } from '@trendmicro/react-sidenav';
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
  const [licence, setlicence] = useState([]);
  const [vender, setvender] = useState([]);
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

    const GetLicense = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/api/profile/getlicence",
            config
          )

          .then((res) => {
            console.log(res.data.alllicence);

            setlicence(res.data.alllicence);

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };

    const GetVender = async () => {

      try {
        await axios
          .get(
            "http://localhost:6500/api/vender/getproduct",
          )

          .then((res) => {
            console.log(res.data.allproduct);

            setvender(res.data.allproduct);

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
    GetLicense();
    GetVender();
  }, []);

  const licencesize = licence.length;
  console.log(licencesize);
  const vendersize = vender.length;
  console.log(vendersize);



  return (
    <>

      <div >

        {hasToken && (<div>

          <Row>
            <Col span={6} style={{
              backgroundColor: "#b5d1e2", paddingBottom: '20%', background: '#b5d1e2',
            }}>

              <div onClick={logOutHandler} style={{ cursor: 'pointer', paddingTop: '2%', paddingLeft: '2%', color: 'black', fontWeight: 'bold' }}>
                <LogoutOutlined /> LogOut
              </div >


              <SideNav style={{
                background: '#b5d1e2',
              }}
              >
                <div style={{ paddingTop: '3vh', paddingLeft: '3vh' }}>



                  <h6 style={{ color: 'black', fontSize: "25px", fontWeight: 'bold' }}>
                    <span class="divider">
                    </span> &nbsp;
                    Crud Operations</h6>
                </div>
                <div style={{ paddingLeft: "30%", paddingRight: "30%", paddingTop: "5%" }}>
                  <Avatar size={140} icon={<img src={image} alt="post" />} />
                </div>
                <div style={{ paddingLeft: "35%", paddingTop: "4%" }}>
                  <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "28px", color: "black" }}>{username}</h1>
                  <h3 style={{ fontFamily: "Trirong", fontWeight: "semibold", fontSize: "20px", color: "blue" }}>&nbsp;&nbsp;&nbsp;&nbsp;{role}</h3>

                </div>


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
                          style={{fontSize: "20px " }}

                        >
                          Home
                        </div>
                      </NavIcon>


                    </NavItem>
                  </Link><br />

                  <Link
                    style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                    to={{
                      pathname: "/license",
                    }}
                  >
                    <NavItem eventKey="Permits and Licence">
                      <NavIcon>

                        <div
                          className="box"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          style={{fontSize: "20px " }}

                        >
                          Permits | Licence
                        </div>
                      </NavIcon>



                    </NavItem>
                  </Link><br />



                  <Link
                    style={{ textDecoration: 'none', color: 'black',  }}
                    to={{
                      pathname: "",
                    }}
                  >
                    <NavItem   eventKey="Fishing Quatos">

                      <NavIcon>

                        <div
                          className="box"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          style={{fontSize: "20px " }}
                        >
                          Fishing Quatos
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
                          style={{fontSize: "20px " }}

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
                          style={{fontSize: "20px " }}

                        >
                          Settings</div>
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
                        <center><h4><b>PERMITS AND LICENSE</b></h4></center>
                        <br />                        <br />

                        <center><h5>Count - {licencesize} Permits</h5></center>
                      </Card></div>

                  </Col>
                  <Col span={8}>
                    <div style={{ paddingLeft: '2vh' }}>
                      <Card hoverable bordered={false} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', height: '25vh' }}>
                        <center><h4><b>FISHING QUOTAS</b></h4></center>
                        <br />                        <br />

                        <center> <h5>Count - 11 Permits</h5></center>
                      </Card></div>

                  </Col>
                  <Col span={8}>
                    <div style={{ paddingLeft: '2vh', paddingRight: '2vh' }}>
                      <Card hoverable bordered={false} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', height: '25vh' }}>
                        <br />                    
                        <br />

                        <center><h4><b>REPORT</b></h4></center>
                      </Card></div>

                  </Col>
                </Row>
              </div>

              <div style={{ paddingTop: '26vh', float: 'right', paddingRight: '4vh' }}>
                <Card hoverable bordered={false} style={{ backgroundColor: '#63A355', height: '18vh', width: '45vh' }}>
                  <center><h4><b>ACTIVE VENDORS</b></h4></center><br />
                  <center><h4><b>{vendersize}</b></h4></center>
                </Card></div>


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
