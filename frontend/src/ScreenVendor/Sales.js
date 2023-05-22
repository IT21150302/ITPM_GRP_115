import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import Chartnew from "./Chartnew";


function Sales(props) {
    const [isHover, setIsHover] = useState(false);
    const [postadd, setpostadd] = useState("");

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const [shows, setShows] = useState(false);

    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    const [sales, setsales] = useState([]);
    const [productname, setproductname] = useState("");
    const [totalvolume, settotalvolume] = useState("");
    const [datecaught, setdatecaught] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [dateexpire, setdateexpire] = useState("");
    const [weekvolumechange, setweekvolumechange] = useState("");
    const [dayvolumechange, setdayvolumechange] = useState(" ");
    const [price, setprice] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (_id,
        productname,
        totalvolume,
        datecaught,
        dateexpire,
        weekvolumechange,
        dayvolumechange,
        price) => {
        setShow(true);
        setid(_id);
        setproductname(productname);
        settotalvolume(totalvolume);
        setdatecaught(datecaught);
        setdateexpire(dateexpire);
        setweekvolumechange(weekvolumechange);
        setdayvolumechange(dayvolumechange);
        setprice(price);
    }


    useEffect(() => {

        //get funtion
        const GetLicense = async () => {

            try {
                await axios
                    .get(
                        "http://localhost:6500/api/vender/getsale",
                    )

                    .then((res) => {
                        console.log(res.data.allsales);
                        setsales(res.data.allsales);

                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };

        GetLicense();
    }, [])

    //delete funtion
    function onDelete(_id) {

        console.log(_id);
        axios.delete("http://localhost:6500/api/vender/deletesale/" + _id).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };

    //Add Data
    function sendData(e) {
        e.preventDefault();
        if (productname.trim().length === 0 || price.trim().length === 0 || dateexpire.trim().length === 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Please fill all the fields");
        }

        const newProducr = {
            productname,
            totalvolume,
            datecaught,
            dateexpire,
            weekvolumechange,
            dayvolumechange,
            price
        }

        axios.post("http://localhost:6500/api/vender/createsale", newProducr).then(() => {
            ("Product added")

            setproductname('');
            settotalvolume('');
            setdatecaught('');
            setdateexpire('');
            setweekvolumechange('');
            setdayvolumechange('');
            setprice('');

            setpostadd("post added ..");


            window.location.reload();

        }).catch((err) => {
            setpostadd("error");
        })
    }
    //Update Licenses
    function update() {

        const newTime = {
            productname,
            totalvolume,
            datecaught,
            dateexpire,
            weekvolumechange,
            dayvolumechange,
            price
        }

        axios.put("http://localhost:6500/api/vender/updatesale/" + _id, newTime).then(() => {
            setproductname(productname);
            settotalvolume(totalvolume);
            setdatecaught(datecaught);
            setdateexpire(dateexpire);
            setweekvolumechange(weekvolumechange);
            setdayvolumechange(dayvolumechange);
            setprice(price);
            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))

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
                <Col span={18}>
                    <div style={{ paddingTop: '2vh', paddingLeft: '1vh' }}>
                        <div style={{ paddingTop: '2vh', paddingRight: '1vh', float: 'right' }}>

                            <Button onClick={handleShows} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)' }}>
                                ADD Sale Information
                            </Button>
                        </div>
                        <h3>Sales Analytics</h3>
                    </div>
                    <div>
                        <Modal show={shows} onHide={handleCloses} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title> <span class="divider2" /> &nbsp; <b>  ADD Sale Information</b></Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={sendData}>
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
                                        <Form.Label>Total Volume : </Form.Label >
                                        <Form.Control placeholder="Total Volume"
                                            onChange={(e) => settotalvolume(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Date Caught :</Form.Label >
                                        <Form.Control placeholder="Date Caught" type="date"
                                            onChange={(e) => setdatecaught(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Expiration :</Form.Label>
                                        <Form.Control placeholder="Expire" type="date"
                                            onChange={(e) => setdateexpire(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Weekly Volume :</Form.Label>
                                        <Form.Control placeholder="Weekly volume change"
                                            onChange={(e) => setweekvolumechange(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Dayly Volume Change :</Form.Label>
                                        <Form.Control placeholder="Dayly Volume Change"
                                            onChange={(e) => setdayvolumechange(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Price :</Form.Label>
                                        <Form.Control placeholder="Price"
                                            onChange={(e) => setprice(e.target.value)} />
                                    </div>

                                    <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                                        <Button style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)', color: 'white' }} variant="warning" type="submit" >ADD Sale Information</Button>
                                        {' '}<Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </div >

                                </div>

                            </Form>
                        </Modal>
                    </div>
                    <br />
                    <hr />

                    <Row>
                        <Col span={11}>
                            <div style={{ paddingLeft: '3px', paddingRight: '1vh', paddingTop: '5vh', paddingBottom: '2vh' }}>
                                <Card border="secondary">
                                <div style={{paddingTop:'2vh',paddingBottom:'2vh',paddingRight:'1vh'}}>
                                <Chartnew />

                                </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={13}>




                            <div style={{ paddingLeft: '2vh', paddingRight: '1vh', paddingTop: '1vh', paddingBottom: '2vh' }}>

                                <br />



                                <Card border="secondary">
                                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "1vh", paddingRight: "1vh" }}>
                                        <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "1vh", paddingRight: "1vh" }}>


                                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                                        <input type="text" placeholder="Search from ' Product Name ' " className="mr-2"
                                                            onChange={(e) => {
                                                                setSearch(e.target.value);
                                                            }} />
                                                    </div>

                                                </div>

                                            </div>

                                            <Table striped bordered hover size="sm" variant="light" >

                                                <thead>

                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Total Volume</th>
                                                        <th>Date Caught</th>
                                                        <th>Expiration</th>
                                                        <th>Weekly Volume</th>
                                                        <th>Day Volume Change</th>
                                                        <th>Price</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {sales.filter(sales => {

                                                        if (search === "") {
                                                            return sales
                                                        }
                                                        else if (sales.productname.toLowerCase().includes(search.toLowerCase())) {
                                                            return sales
                                                        }
                                                    }).map((sales) => {
                                                        return (

                                                            <tr key={sales._id}>

                                                                <td>{sales.productname}</td>
                                                                <td>{sales.totalvolume}</td>
                                                                <td>{sales.datecaught}</td>
                                                                <td>{sales.dateexpire}</td>
                                                                <td>{sales.weekvolumechange}</td>
                                                                <td>{sales.dayvolumechange}</td>
                                                                <td>{sales.price}</td>
                                                                <td>
                                                                    <Button variant="outline-success" onClick={() => handleShow(sales._id, sales.productname, sales.totalvolume, sales.datecaught, sales.dateexpire, sales.weekvolumechange, sales.dayvolumechange, sales.price)} ><FaPencilAlt /></Button>
                                                                </td>

                                                                <td>
                                                                    <Button variant="outline-danger" onClick={() => onDelete(sales._id)}><FaTrashAlt /></Button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}

                                                </tbody>

                                            </Table >

                                        </div>
                                    </div>

                                </Card>

                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE Sales Analytics</b></Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <Form >

                                        <div >
                                            <Form.Label>Product Name :</Form.Label>
                                            <Form.Control placeholder="Product Name"
                                                value={productname}
                                                onChange={(e) => setproductname(e.target.value)} />
                                        </div>
                                        <div >
                                            <Form.Label>Total Volume : </Form.Label >
                                            <Form.Control placeholder="Total Volume" value={totalvolume}
                                                onChange={(e) => settotalvolume(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>Date Caught :</Form.Label >
                                            <Form.Control placeholder="Date Caught" type="date" value={datecaught}
                                                onChange={(e) => setdatecaught(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>Expiration :</Form.Label>
                                            <Form.Control placeholder="Expire" type="date" value={dateexpire}
                                                onChange={(e) => setdateexpire(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>Weekly Volume :</Form.Label>
                                            <Form.Control placeholder="Weekly volume change" value={weekvolumechange}
                                                onChange={(e) => setweekvolumechange(e.target.value)} />
                                        </div>
                                        <div >
                                            <Form.Label>Dayly Volume Change :</Form.Label>
                                            <Form.Control placeholder="Dayly Volume Change" value={dayvolumechange}
                                                onChange={(e) => setdayvolumechange(e.target.value)} />
                                        </div>
                                        <div >
                                            <Form.Label>Price :</Form.Label>
                                            <Form.Control placeholder="Price" value={price}
                                                onChange={(e) => setprice(e.target.value)} />
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
                        </Col>

                    </Row>


                </Col>
            </Row>
        </div>


    );

}
export default Sales;



