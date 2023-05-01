import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'antd';


import axios from "axios";

export default function CusPost() {

  
    const [post, setpost] = useState([]);
   
    const [search, setSearch] = useState("");
    
    const { Meta } = Card;


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
                        "http://localhost:6500/api/profile/getcuspost",
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

        getpost();
    }, [])


   
   
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

                            if (search === "" ) {
                                return post
                            }
                            else if (post.name.toLowerCase().includes(search.toLowerCase()) ) {
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
                                                              
                                                            </Card>


                                                        </div>
                                                    )
                                                }
                                            })()}

                                            
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