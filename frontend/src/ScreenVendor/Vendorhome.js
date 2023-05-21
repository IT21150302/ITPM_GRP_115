import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";

import Vendorcontent from "./Vendorcontent";
export default function Vendorhome() {
    const [isHover, setIsHover] = useState(false);



    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };




    return (
        <div>

            <Row>
                <Col span={6} style={{
                    backgroundColor: "#b5d1e2", paddingBottom: '20%', background: '#b5d1e2',
                }}>

                    <SideNav style={{
                        background: '#b5d1e2',
                    }}
                    ><div style={{ paddingTop: '3vh', paddingLeft: '3vh' }}>



                    <h6 style={{ color: 'black', fontSize: "25px", fontWeight: 'bold' }}>
                        <span class="divider">
                        </span> &nbsp;
                        Vendor's  Operations</h6>
                </div>

                        <div style={{ paddingTop: '3vh', paddingLeft: '5vh', paddingBottom: '20%' }}>

                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                                to={{
                                    pathname: "/vhome",
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
                                    pathname: "/inventory",
                                }}
                            >
                                <NavItem eventKey="inventory">
                                    <NavIcon>

                                        <div
                                            className="box"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ fontSize: "20px " }}

                                        >Inventory
                                        </div>
                                    </NavIcon>



                                </NavItem>
                            </Link><br />



                            <Link
                                style={{ textDecoration: 'none', color: 'black', }}
                                to={{
                                    pathname: "/support",
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
                                            support
                                        </div>
                                    </NavIcon>



                                </NavItem>
                            </Link><br />

                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                                to={{
                                    pathname: "/sales",
                                }}
                            >
                                <NavItem eventKey="sales">
                                    <NavIcon>

                                        <div
                                            className="box"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ fontSize: "20px " }}

                                        >
                                            Sales Analytics</div>
                                    </NavIcon>


                                </NavItem>
                            </Link><br />
                            <div style={{ paddingRight: '3vh' }}>
                                <hr />
                            </div>

                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                                to={{
                                    pathname: "/",
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
                                to={{
                                    pathname: "/",
                                }}
                            >
                                <NavItem eventKey="logout">

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


                <Col span={18} >
                    <div  >
                        <div style={{ paddingLeft: '8vh', paddingTop: '5vh',paddingBottom:'1vh' }}>
                            <h3>Home (Vendor)</h3>
                        </div>
                        <Vendorcontent/>
                    </div>
                </Col>
            </Row>
        </div>
    );
}