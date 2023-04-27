import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";

import axios from "axios";

export default function Settings() {
   
    const [isHover, setIsHover] = useState(false);
    const [id, setid] = useState([]);

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
    axios.delete("http://localhost:6500/api/profile/deleteprofile/" + _id, config).then((res) => {
      alert('Deleted Successfully');
      window.location = `/`;
    }).catch((err) => {
      alert(err.message);
    })
  }

    useEffect(() => {

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

                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };
        GetProfile();
    }, [])




    return (
        <div>

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

                    <div style={{ paddingLeft: '15vh' }} >

                        <div style={{ paddingLeft: '8vh', paddingTop: '15vh' }}>
                            
                            <Card hoverable style={{ width: '38rem', height: '15rem', background: '#b5d1e2' }} onClick={() => onDelete(id)}>
                                <div style={{ paddingTop: '4rem', paddingLeft: '3vh' }}>

                                    <h3 style={{ color: 'black' }}><span class="divider3">
                                    </span> &nbsp;Click Here To Delete Your Profile</h3>
                                </div>
                            </Card>

                        </div>

                    </div>
                </Col>

            </Row>



        </div>
    );
}