import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import { Card, Button } from 'antd';

const Profile = () => {
    const [username, setusername] = useState("");

    const [email, setemail] = useState("");
    const [isHover, setIsHover] = useState(false);


    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    useEffect(() => {

        //get funtion
        const GetProfile = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            try {
                await axios
                    .get(
                        "http://localhost:3001/auth/profile",
                        config
                    )

                    .then((res) => {
                        console.log(res.data.profile);
                        setusername(res.data.profile.username);
                        setemail(res.data.profile.email);
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

    //delete profile funtion
    function onDelete(_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        console.log(_id);
        axios.delete("http://localhost:3001/auth/profile/" + _id, config).then((res) => {
            alert('Deleted Successfully');
            window.location = `/`;
        }).catch((err) => {
            alert(err.message);
        })
    }

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
    };

    return (
        <div >
            <Row>
                <Col span={6} style={{
                    paddingBottom: '20%',
                }}>

                    <SideNav
                    >  <div style={{
                        paddingTop: '3vh', paddingLeft: '3vh'
                    }}>



                            <h6 style={{ color: 'black', fontSize: "25px", fontWeight: 'bold' }}>
                                &nbsp;
                                Weather Forecast</h6>
                        </div>

                        <div style={{ paddingTop: '3vh', paddingLeft: '5vh', paddingBottom: '20%' }}>

                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                                to={{
                                    pathname: "/main",
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
                                    pathname: "/forecast",
                                }}
                            >
                                <NavItem eventKey="forecast">
                                    <NavIcon>

                                        <div
                                            className="box"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ fontSize: "20px " }}

                                        >Weather Forecast
                                        </div>
                                    </NavIcon>
                                </NavItem>
                            </Link><br />


                            <div style={{ paddingRight: '3vh' }}>
                                <hr />
                            </div>

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
                                            Profile</div>
                                    </NavIcon>

                                </NavItem>
                            </Link><br />

                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                                onClick={logOutHandler}
                            >
                                <NavItem eventKey="logout">
                                    <NavIcon>
                                        <div
                                            className="box"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ fontSize: "20px " }}

                                        >
                                            Log out</div>
                                    </NavIcon>

                                </NavItem>
                            </Link><br />


                        </div>
                    </SideNav>
                </Col>
                <Col span={18} style={{
                    backgroundColor: "#b5d1e2",
                    paddingBottom: '12vh'
                }}>
                    <div style={{ paddingTop: '10vh', paddingLeft: '7vh' }}>
                        <Card style={{ width: 900 }} hoverable>
                            <div style={{ paddingTop: '2vh', paddingLeft: '2vh', paddingRight: '2vh', paddingBottom: '2vh' }}>
                                <hr />

                                <h3>Profile Details</h3>
                                <br />
                                <h5>Logged As : {username} </h5>
                                <h5>Logged Email : {email}  </h5>
                                <br />
                                <hr />
                                <Button danger variant="danger" onClick={() => onDelete(_id)}>Delete Profile</Button>

                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Profile;
