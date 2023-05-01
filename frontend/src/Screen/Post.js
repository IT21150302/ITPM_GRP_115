import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'antd';
import { Button, Modal, Form, Alert } from "react-bootstrap";

import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

import axios from "axios";

export default function Post() {

    const [isHover, setIsHover] = useState(false);
    const [_id, setid] = useState(" ");
    const [uemail, setemails] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [uploads, setuploads] = useState("");
    const [post, setpost] = useState([]);
    const [shows, setShows] = useState(false);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [uusername, setusernames] = useState("");
    const [user, setuser] = useState("");
    const [ema, setema] = useState("");
    const { Meta } = Card;

    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);
    const handleShow = (_id, name, uploads, description,
    ) => {
        setShow(true);
        setid(_id);
        setname(name);
        setuploads(uploads);
        setdescription(description);

    }


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
        axios.delete("http://localhost:6500/api/profile/deletepost/" + _id, config).then((res) => {
            alert('Deleted Successfully');
            window.location = `/guidline`;
        }).catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {



        //get funtion
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
                        setid(res.data.profile._id);
                        setemails(res.data.profile.email);
                        setusernames(res.data.profile.username);
                        setema(res.data.profile.email);
                        setuser(res.data.profile.username);
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
    }, [])


    //Update Post
    function update() {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        const newTime = {
            name,
            uploads,
            description,
        }

        axios.put("http://localhost:6500/api/profile/updatepost/" + _id, newTime, config).then(() => {
            setname(name);
            setuploads(uploads);
            setdescription(description);
            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))

    }
    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };
    return (
        <div>


            <div style={{ paddingLeft: '3vh' }} >

                <div >


                    <br />
                    <div style={{ paddingRight: '5vh', float: 'right' }}>


                    </div><br />
                    <div style={{ paddingBottom: "2vh", float: 'right', paddingRight: '5vh' }}>
                        <input type="text" placeholder="Search Post from ' name ' " className="mr-2"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }} /> <br />
                    </div>
                    <br />
                    <h4>Posts</h4><br />
                   
                    <Row gutter={16}>
                        {post.filter(post => {

                            if (search === "" && uemail === post.email) {
                                return post
                            }
                            else if (post.name.toLowerCase().includes(search.toLowerCase()) && uemail === post.email) {
                                return post
                            }
                        }).
                            map((post) => {
                                return (
                                    <div key={post._id} >
                                        <Col span={8} >

                                            {(() => {
                                                if (post.uploads === 'Post') {
                                                    return (
                                                        <div style={{paddingBottom:'1vh'}}>

                                                            <Card
                                                                hoverable
                                                                style={{ width: 240, height:440 }}
                                                                cover={<img alt="example" src={post.posttImage.imageSecURL} />}
                                                            >
                                                                <Meta title={post.name} description={post.description} />
                                                                <br /> Added By: <p>{post.email}</p>
                                                                <Button variant="outline-success" onClick={() => handleShow(post._id, post.name, post.uploads, post.description, post.email)} >Edit</Button>
                                                                &nbsp;
                                                                <Button variant="outline-danger" onClick={() => onDelete(post._id)}>Delete</Button>
                                                            </Card>


                                                        </div>
                                                    )
                                                }
                                            })()}

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE POST</b></Modal.Title>

                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form >

                                                        <div >
                                                            <Form.Label>Name :</Form.Label>
                                                            <Form.Control placeholder="name"
                                                                value={name}
                                                                onChange={(e) => setname(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Upload Type : </Form.Label >
                                                            <Form.Control placeholder="uploads"
                                                                value={uploads}
                                                                onChange={(e) => setuploads(e.target.value)} disabled />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Description :</Form.Label >
                                                            <Form.Control placeholder="description" as="textarea" rows={3} 
                                                                value={description}
                                                                onChange={(e) => setdescription(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Email :</Form.Label>
                                                            <Form.Control placeholder="email"
                                                                value={ema}
                                                                disabled />
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
                                    </div>
                                );

                            })}


                    </Row>
                </div>

            </div>




        </div>
    );
}