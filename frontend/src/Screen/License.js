import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt, FaDownload } from "react-icons/fa";
import { Row, Col, Avatar } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";


function License(props) {
  const [isHover, setIsHover] = useState(false);
  const [postadd, setpostadd] = useState("");
  const [message, setmessage] = useState("");

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const [shows, setShows] = useState(false);

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [image, setimage] = useState("");
  const [role, setrole] = useState("");

  const [license, setlicense] = useState([]);
  const [uemail, setemail] = useState("");
  const [email, setemails] = useState("");
  const [username, setusernames] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [expire, setexpire] = useState("");
  const [agency, setagency] = useState("");
  const [type, settype] = useState(" ");
  const [licenceno, setlicenceno] = useState(" ");
  const [uusername, setusername] = useState(" ");
  const [fileEnc, fileEncData] = useState(" ");

  const [_id, setid] = useState(" ");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (_id,
    licenceno, type, agency, expire
  ) => {
    setShow(true);
    setid(_id);
    setexpire(expire);
    settype(type);
    setagency(agency);
    setlicenceno(licenceno);
  }


  useEffect(() => {

    //get funtion
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
            console.log("nS3X" + uemail)
            setlicense(res.data.alllicence);



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
            setusernames(res.data.profile.username);
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
  }, [])

  //delete funtion
  function onDelete(_id) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    console.log(_id);
    axios.delete("http://localhost:6500/api/profile/deletelicence/" + _id, config).then((res) => {
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

  //Add license
  function sendData(e) {
    e.preventDefault();
    if (licenceno.trim().length === 0 || expire.trim().length === 0 || fileEnc.trim().length === 0) {
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

    const email = uemail
    const username = uusername
    const newProducr = {
      email,
      expire,
      agency,
      type,
      licenceno,
      username,
      fileEnc
    }

    axios.post("http://localhost:6500/api/profile/createlicence", newProducr, config).then(() => {
      ("Product added")

      setemails('');
      setusernames('');
      fileEncData('');
      setexpire('');
      setagency('');
      settype('');
      setlicenceno('');
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
      expire,
      agency,
      type,
      licenceno,
    }

    axios.put("http://localhost:6500/api/profile/updatelicence/" + _id, newTime, config).then(() => {
      setexpire(expire);
      settype(type);
      setagency(agency);
      setlicenceno(licenceno);
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
              <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "28px", color: "black" }}>{uusername}</h1>
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
                      style={{ fontSize: "20px " }}

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
                      style={{ fontSize: "20px " }}

                    >
                      Permits | Licence
                    </div>
                  </NavIcon>



                </NavItem>
              </Link><br />



              <Link
                style={{ textDecoration: 'none', color: 'black', }}
                to={{
                  pathname: "",
                }}
              >
                <NavItem eventKey="Fishing Quatos">

                  <NavIcon>

                    <div
                      className="box"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{ fontSize: "20px " }}
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
            </div>
          </SideNav>
        </Col>


        <Col span={18}   >
          <div style={{ paddingTop: '2vh', paddingLeft: '5vh' }}>
            <h3>Permits and License</h3>
          </div>
          <div style={{ paddingTop: '2vh', paddingRight: '5vh', float: 'right' }}>
            <Button onClick={handleShows} style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)' }}>
              ADD NEW LICENSE
            </Button>
            <Modal show={shows} onHide={handleCloses} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title> <span class="divider2" /> &nbsp; <b>ADD NEW LICENSE</b></Modal.Title>

              </Modal.Header>
              <Form onSubmit={sendData}>
                {postadd && <Alert variant="info"  >
                  {postadd}</Alert>}
                {error && <span className="error-message" style={{ color: "blue" }}>{error}</span>}

                <div style={{ paddingTop: '2vh', paddingLeft: '2vh', paddingRight: '2vh', paddingBottom: '2vh' }}>
                  <div >
                    <Form.Label>License No :</Form.Label>
                    <Form.Control placeholder="License No"
                      onChange={(e) => setlicenceno(e.target.value)} />
                  </div>

                  <div >
                    <Form.Label>License Type : </Form.Label >
                    <Form.Control placeholder=" License Type"
                      onChange={(e) => settype(e.target.value)} />
                  </div>

                  <div >
                    <Form.Label>Issuing Agency :</Form.Label >
                    <Form.Control placeholder="Issuing Agency"
                      onChange={(e) => setagency(e.target.value)} />
                  </div>

                  <div >
                    <Form.Label>Expiration :</Form.Label>
                    <Form.Control placeholder="Expire" type="date"
                      onChange={(e) => setexpire(e.target.value)} />
                  </div><br />
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

                    <Button style={{ backgroundColor: 'rgba(44, 117, 207, 0.912)', border: 'rgba(44, 117, 207, 0.912)', color: 'white' }} variant="warning" type="submit" >ADD LICENSE</Button>
                    {' '}<Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </div >

                </div>

              </Form>
            </Modal>
          </div>
          <br />



          <div style={{ paddingLeft: '2vh', paddingRight: '7vh', paddingTop: '8vh', paddingBottom: '2vh' }}>
            <hr />

            <br />



            <Card border="secondary">
              <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "5vh", paddingRight: "5vh" }}>


                  <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                    <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                      <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                        <input type="text" placeholder="Search from ' Type ' " className="mr-2"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }} />
                      </div>

                    </div>

                  </div>

                  <Table striped bordered hover size="sm" variant="light" >

                    <thead>

                      <tr>
                        <th>Licence No</th>
                        <th>Licence Type</th>
                        <th>Issuing Agency</th>
                        <th>Expiration</th>
                        <th>Document</th>

                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      {license.filter(license => {

                        if (search === "" && uemail === license.email) {
                          return license
                        }
                        else if (license.type.toLowerCase().includes(search.toLowerCase()) && uemail === license.email) {
                          return license
                        }
                      }).
                        map((license) => {


                          return (

                            <tr key={license._id}>

                              <td>{license.licenceno}</td>
                              <td>{license.type}</td>
                              <td>{license.agency}</td>
                              <td>{license.expire}</td>
                              <td><a href={license.posttImage.imageSecURL} > <FaDownload /> </a></td>

                              <td>
                                <Button variant="outline-success" onClick={() => handleShow(license._id, license.licenceno, license.type, license.agency, license.expire)} ><FaPencilAlt /></Button>
                              </td>

                              <td>
                                <Button variant="outline-danger" onClick={() => onDelete(license._id)}><FaTrashAlt /></Button>
                              </td>
                            </tr>
                          );
                        })}

                    </tbody>

                  </Table >
                  {message && <span className="3error-message" style={{ color: "orange", fontSize: '22px' }}><br />{message}</span>}

                </div>
              </div>



            </Card>

          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE LICENSE</b></Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <Form >

                <div >
                  <Form.Label>License No :</Form.Label>
                  <Form.Control placeholder="License No"
                    value={licenceno}
                    onChange={(e) => setlicenceno(e.target.value)} />
                </div>

                <div >
                  <Form.Label>License Type : </Form.Label >
                  <Form.Control placeholder="Type"
                    value={type}
                    onChange={(e) => settype(e.target.value)} />
                </div>

                <div >
                  <Form.Label>Issuing Agency :</Form.Label >
                  <Form.Control placeholder="Issuing Agency"
                    value={agency}
                    onChange={(e) => setagency(e.target.value)} />
                </div>

                <div >
                  <Form.Label>Expiration :</Form.Label>
                  <Form.Control placeholder="Expire"
                    value={expire}
                    onChange={(e) => setexpire(e.target.value)} />
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
export default License;



