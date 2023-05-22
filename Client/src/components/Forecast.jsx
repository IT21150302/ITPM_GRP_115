import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";


function Forecast(props) {
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

    const [forecast, setsforecast] = useState([]);
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [temperature, settemperature] = useState("");
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [windspeed, setwindspeed] = useState("");
    const [winddirection, setwinddirection] = useState("");
    const [location, setlocation] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (_id,
        date,
        time,
        temperature,
        windspeed,
        winddirection,
        location) => {
        setShow(true);
        setid(_id);
        setdate(date);
        settime(time);
        settemperature(temperature);
        setwindspeed(windspeed);
        setwinddirection(winddirection);
        setlocation(location);
    }


    useEffect(() => {

        //get funtion
        const GetForcast = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            try {
                await axios
                    .get(
                        "http://localhost:3001/api/forecast",
                        config
                    )

                    .then((res) => {
                        console.log(res.data.allforecast);
                        setsforecast(res.data.allforecast);

                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };

        GetForcast();
    }, [])

    //delete funtion
    function onDelete(_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        console.log(_id);
        axios.delete("http://localhost:3001/api/forecast/" + _id,config).then((res) => {
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
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        e.preventDefault();
        if (windspeed.trim().length === 0 || temperature.trim().length === 0 || date.trim().length === 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Please fill all the fields");
        }

        const newProducr = {
            date,
            time,
            temperature,
            windspeed,
            winddirection,
            location
        }

        axios.post("http://localhost:3001/api/forecast", newProducr,config).then(() => {
            ("Product added")

            setdate('');
            settime('');
            settemperature('');
            setwindspeed('');
            setwinddirection('');
            setlocation('');

            setpostadd("post added ..");


            window.location.reload();

        }).catch((err) => {
            setpostadd("error");
        })
    }
    //Update Licenses
    function update() {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

        const newTime = {
            date,
            time,
            temperature,
            windspeed,
            winddirection,
            location
        }

        axios.put("http://localhost:3001/api/forecast/" + _id,newTime,config).then(() => {
            setdate(date);
            settime(time);
            settemperature(temperature);
            setwindspeed(windspeed);
            setwinddirection(winddirection);
            setlocation(location);
            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))

    }

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
      };

    return (
        <div>
            <Row>
                <Col span={6} style={{
                    paddingBottom: '20%', 
                }}>

                    <SideNav 
                    >  <div style={{ paddingTop: '3vh', paddingLeft: '3vh' }}>



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
                    backgroundColor: "#b5d1e2"
                }}>
                    <div style={{ paddingTop: '2vh', paddingLeft: '1vh' }}>
                        <div style={{ paddingTop: '2vh', paddingRight: '1vh', float: 'right' }}>

                            <Button onClick={handleShows} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)' }}>
                                ADD Weather Forecast
                            </Button>
                        </div>
                        <h3>Weather Forecast</h3>
                    </div>
                    <div>
                        <Modal show={shows} onHide={handleCloses} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>  &nbsp; <b>  Add Weather Forecast</b></Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={sendData}>
                                {postadd && <Alert variant="info"  >
                                    {postadd}</Alert>}
                                {error && <span className="error-message" style={{ color: "blue" }}>{error}</span>}

                                <div style={{ paddingTop: '2vh', paddingLeft: '2vh', paddingRight: '2vh', paddingBottom: '2vh' }}>
                                    <div >
                                        <Form.Label>Date :</Form.Label>
                                        <Form.Control placeholder="Date" type="date"
                                            onChange={(e) => setdate(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Time : </Form.Label >
                                        <Form.Control placeholder="Time" type="time"
                                            onChange={(e) => settime(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Temperature :</Form.Label >
                                        <Form.Control placeholder="temperature" type="text"
                                            onChange={(e) => settemperature(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Wind Speed :</Form.Label>
                                        <Form.Control placeholder="Wind Speed" type="text"
                                            onChange={(e) => setwindspeed(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Wind Direction :</Form.Label>
                                        <Form.Control placeholder="Wind Direction"
                                            onChange={(e) => setwinddirection(e.target.value)} />
                                    </div>

                                    <div >
                                        <Form.Label>Location :</Form.Label>
                                        <Form.Control placeholder="Location"
                                            onChange={(e) => setlocation(e.target.value)} />
                                    </div>


                                    <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                                        <Button style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)', color: 'white' }} variant="warning" type="submit" >ADD Weather Information</Button>
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





                            <div style={{ paddingLeft: '2vh', paddingRight: '1vh', paddingTop: '1vh', paddingBottom: '2vh' }}>

                                <br />



                                <Card border="secondary">
                                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "1vh", paddingRight: "1vh" }}>
                                        <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "1vh", paddingRight: "1vh" }}>


                                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                                        <input type="text" placeholder="Search from 'Location ' " className="mr-2"
                                                            onChange={(e) => {
                                                                setSearch(e.target.value);
                                                            }} />
                                                    </div>

                                                </div>

                                            </div>

                                            <Table striped bordered hover size="sm" variant="light" >

                                                <thead>

                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Time</th>
                                                        <th>Temprture</th>
                                                        <th>Wind Speed</th>
                                                        <th> Wind Direction</th>
                                                        <th> Location</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {forecast.filter(forecast => {

                                                        if (search === "") {
                                                            return forecast
                                                        }
                                                        else if (forecast.location.toLowerCase().includes(search.toLowerCase())) {
                                                            return forecast
                                                        }
                                                    }).map((forecast) => {
                                                        return (

                                                            <tr key={forecast._id}>

                                                                <td>{forecast.date}</td>
                                                                <td>{forecast.time}</td>
                                                                <td>{forecast.temperature}</td>
                                                                <td>{forecast.windspeed}</td>
                                                                <td>{forecast.winddirection}</td>
                                                                <td>{forecast.location}</td>
                                                                <td>
                                                                    <Button variant="outline-success" onClick={() => handleShow(forecast._id, forecast.date,forecast.time,forecast.temperature,forecast.windspeed,forecast.winddirection,forecast.location)} ><FaPencilAlt /></Button>
                                                                </td>

                                                                <td>
                                                                    <Button variant="outline-danger" onClick={() => onDelete(forecast._id)}><FaTrashAlt /></Button>
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
                                    <Modal.Title> &nbsp; <b>UPDATE Weather Forecast</b></Modal.Title>

                                </Modal.Header>
                                <Modal.Body>
                                    <Form >

                                        <div >
                                            <Form.Label>date  :</Form.Label>
                                            <Form.Control placeholder="date "
                                                value={date} type='date'
                                                onChange={(e) => setdate(e.target.value)} />
                                        </div>
                                        <div >
                                            <Form.Label> time : </Form.Label >
                                            <Form.Control placeholder="time" value={time} type='time'
                                                onChange={(e) => settime(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>temperature :</Form.Label >
                                            <Form.Control placeholder="temperature" type="text" value={temperature}
                                                onChange={(e) => settemperature(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>wind speed :</Form.Label>
                                            <Form.Control placeholder="windspeed" type="text" value={windspeed}
                                                onChange={(e) => setwindspeed(e.target.value)} />
                                        </div>

                                        <div >
                                            <Form.Label>winddirection :</Form.Label>
                                            <Form.Control placeholder="Wind Direction" value={winddirection}
                                                onChange={(e) => setwinddirection(e.target.value)} />
                                        </div>
                                        <div >
                                            <Form.Label>location :</Form.Label>
                                            <Form.Control placeholder="location" value={location}
                                                onChange={(e) => setlocation(e.target.value)} />
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

        </div>


    );

}
export default Forecast;



