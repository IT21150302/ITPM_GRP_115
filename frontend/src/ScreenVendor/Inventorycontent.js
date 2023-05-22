import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card,Col,Row,Button,Modal,Form} from 'react-bootstrap';


export default function Inventorycontent() {
    const [vendor, setvendor] = useState([]);
    const [productname, setproductname] = useState("");
    const [description, setdescription] = useState("");
    const [datecaught, setdatecaught] = useState("");
    const [dateexpire, setdateexpire] = useState("");
    const [price, setprice] = useState("");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (_id,
        productname,
        description,
        datecaught,
        dateexpire,
        price    ) => {
        setShow(true);
        setid(_id);
        setproductname(productname);
            setdescription(description);
            setdatecaught(datecaught);
            setdateexpire(dateexpire);
            setprice(price);
    }
    useEffect(() => {
        //get funtion
        const GetVendor = async () => {

            try {
                await axios
                    .get(
                        "http://localhost:6500/api/vender/getproduct",

                    )

                    .then((res) => {
                        console.log(res.data.allproduct);
                        setvendor(res.data.allproduct);
                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };
        GetVendor();
    }, [])

    //delete funtion
    function onDelete(_id) {

        console.log(_id);
        axios.delete("http://localhost:6500/api/vender/deleteproduct/" + _id).then((res) => {
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
    //Update 
    function update() {

        const newTime = {
            productname,
            description,
            datecaught,
            dateexpire,
            price,
        }

        axios.put("http://localhost:6500/api/vender/updateproduct/" + _id, newTime).then(() => {
            setproductname('');
            setdescription('');
            setdatecaught('');
            setdateexpire('');
            setprice('');
            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))

    }

    return (
        <div>
            <Row xs={1} md={3} className="g-4">
                {vendor.map((vendor) => {
                    return (<Col>
                        <div style={{ paddingLeft: '3vh', paddingRight: '1vh', paddingBottom: '5vh', paddingTop: '2vh' }}>

                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={vendor.productImage.imageSecURL} />
                                <Card.Body>
                                    <div style={{ paddingLeft: '1vh' }}>
                                        <Card.Title>{vendor.productname}</Card.Title>
                                        <div style={{ paddingLeft: '2vh' }}>
                                            <Card.Text>
                                                {vendor.description} Caught on {vendor.datecaught} and
                                                expire date is {vendor.dateexpire}<br />
                                                Price: {vendor.price}
                                            </Card.Text>
                                            <Button type="primary" onClick={() => handleShow(vendor._id, vendor.productname, vendor.description, vendor.datecaught, vendor.dateexpire,vendor.price)}> Update</Button>{' '}
                                            <Button onClick={() => onDelete(vendor._id)} >Delete</Button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> <span class="divider2" /> &nbsp; <b>UPDATE Product</b></Modal.Title>

                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form >

                                                        <div >
                                                            <Form.Label>Product Name :</Form.Label>
                                                            <Form.Control placeholder="Product"
                                                                value={productname}
                                                                onChange={(e) => setproductname(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Description : </Form.Label >
                                                            <Form.Control placeholder="Description"
                                                                value={description}
                                                                onChange={(e) => setdescription(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Date Caught :</Form.Label >
                                                            <Form.Control placeholder="Date Caught"
                                                                value={datecaught}
                                                                onChange={(e) => setdatecaught(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Expiration :</Form.Label>
                                                            <Form.Control placeholder="Expire"
                                                                value={dateexpire}
                                                                onChange={(e) => setdateexpire(e.target.value)} />
                                                        </div>

                                                        <div >
                                                            <Form.Label>Price :</Form.Label>
                                                            <Form.Control placeholder="Price"
                                                                value={price}
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
                                        </div>

                                    </div>

                                </Card.Body>
                            </Card>
                        </div>

                    </Col>);
                })}
            </Row>
        </div>
    )
}