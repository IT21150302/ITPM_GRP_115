import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function Products() {
    const [vendor, setvendor] = useState([]);

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

    return (
        <div>
            <div style={{paddingTop:'2vh',paddingLeft:'4vh'}}>
            <h3>Products Available Today</h3>
            </div>

            <Row xs={1} md={4} className="g-4">
                {vendor.map((vendor) => {
                    return (<Col key={vendor._id}>
                        
                        <div  style={{ paddingLeft: '3vh', paddingRight: '2vh', paddingBottom: '3vh',paddingTop:'2vh' }}>
                            <Card  style={{ width: '18rem' }}>
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