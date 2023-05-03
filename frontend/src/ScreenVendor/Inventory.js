import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import Inventorycontent from "./Inventorycontent";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
import axios from "axios";

export default function Vendorhome() {
    const [isHover, setIsHover] = useState(false);
    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);
    const [postadd, setpostadd] = useState("");


    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const [productname, setproductname] = useState("");
    const [description, setdescription] = useState("");
    const [datecaught, setdatecaught] = useState("");
    const [dateexpire, setdateexpire] = useState("");
    const [price, setprice] = useState("");
    const [fileEnc, fileEncData] = useState("");

    const [error, setError] = useState("");


    //Add license 
    function addproduct(e) {
        e.preventDefault();
        console.log('button licked');
        console.log(productname)
        console.log(datecaught)
        console.log(fileEnc)

        const newProducr = {
            productname,
            description,
            datecaught,
            dateexpire,
            price,
            fileEnc,
        }

        axios.post("http://localhost:6500/api/vender/createproduct", newProducr).then(() => {
            ("Product added")

            setproductname('');
            setdescription('');
            setdatecaught('');
            setdateexpire('');
            setprice('');
            fileEncData('');
            alert("Product added ..");
            window.location.reload();

        }).catch((err) => {
            setpostadd("error");
        })
    }

    return (
        <div>

            <Row>
                <Col span={6} style={{
                    backgroundColor: "#b5d1e2", paddingBottom: '20%', background: '#b5d1e2',
                }}>

                    <SideNav style={{
                        background: '#b5d1e2',
                    }}
                    >  <div style={{ paddingTop: '3vh', paddingLeft: '3vh' }}>



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
                        <div style={{ paddingLeft: '8vh', paddingTop: '5vh', paddingBottom: '2vh', paddingRight: '3vh' }}>
                            <div style={{ float: 'right' }}>
                                <Button type="primary" onClick={handleShows}>Add a Product</Button>
                                <Modal show={shows} onHide={handleCloses} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> <span className="divider2" /> &nbsp; <b>ADD NEW PRODUCT</b></Modal.Title>

                                    </Modal.Header>
                                    <Form onSubmit={addproduct}>
                                        {postadd && <Alert variant="info"  >
                                            {postadd}</Alert>}
                                        {error && <span className="error-message" style={{ color: "blue" }}>{error}</span>}

                                        <div style={{ paddingTop: '2vh', paddingLeft: '2vh', paddingRight: '2vh', paddingBottom: '2vh' }}>
                                            <div >
                                                <Form.Label>Product Name :</Form.Label>
                                                <Form.Control placeholder="Product Name"
                                                    onChange={(e) => setproductname(e.target.value)} />
                                            </div>

                                            <div >
                                                <Form.Label>Description : </Form.Label >
                                                <Form.Control placeholder="Description"
                                                    onChange={(e) => setdescription(e.target.value)} />
                                            </div>

                                            <div >
                                                <Form.Label>Date Caught :</Form.Label >
                                                <Form.Control placeholder="Date Caught" type="date"
                                                    onChange={(e) => setdatecaught(e.target.value)} />
                                            </div>

                                            <div >
                                                <Form.Label>Expiration :</Form.Label>
                                                <Form.Control placeholder="Date Expire" type="date"
                                                    onChange={(e) => setdateexpire(e.target.value)} />
                                            </div><br />
                                            <div >
                                                <Form.Label>Price :</Form.Label >
                                                <Form.Control placeholder="Price"
                                                    onChange={(e) => setprice(e.target.value)} />
                                            </div>
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

                                                <Button style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)', color: 'white' }} variant="warning" type="submit" >ADD Product</Button>
                                                {' '}<Button variant="secondary" onClick={handleCloses}>
                                                    Close
                                                </Button>
                                            </div >

                                        </div>

                                    </Form>
                                </Modal>
                            </div>
                            <h3>Inventory Management</h3>
                            <Inventorycontent />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}