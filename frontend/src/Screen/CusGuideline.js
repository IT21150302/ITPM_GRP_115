import React, { useState, useEffect } from "react";
import { Row, Col, Card } from 'antd';


import axios from "axios";
import CusPost from "./CusPost";

export default function CusGuideline() {

  
  const [post, setpost] = useState([]);
  const [search, setSearch] = useState("");

  

  useEffect(() => {



    //get funtion
    const getpost = async () => {
    
      try {
        await axios
          .get(
            "http://localhost:6500/api/profile/getcuspost",
            
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

      <Row>
        <Col span={4} style={{
          backgroundColor: "#b5d1e2", paddingBottom: '110%', background: '#b5d1e2',
        }}>

         
        </Col>


        <Col span={20}   >

          <div style={{ paddingLeft: '3vh' }} >

            <div style={{ paddingTop: '2vh' }}>

              <h4><b>Guidelines</b></h4>
              <Row>
                <Col>
                  <video autoPlay muted loop style={{ width: '47%', paddingLeft: '2px' }} >
                    <source
                      src="https://res.cloudinary.com/iplus/video/upload/v1679238049/stock-footage-colorful-siamese-elephant-ear-fighting-fish-betta-splendens-also-known-as-thai-fighting-fish-or_moa2y7.webm"
                      type="video/mp4"
                    />
                  </video>

                  <video autoPlay muted loop style={{ width: '47%', paddingTop: '2px' }} >
                    <source
                      src="https://res.cloudinary.com/iplus/video/upload/v1679238603/1061714161-preview_i4rin3.mp4"
                      type="video/mp4"
                    />
                  </video>
                </Col>

              </Row>
              <br />
              <div style={{ paddingRight: '5vh', float: 'right' }}>
                
              </div><br />
              <br />
              <div style={{ paddingBottom: "1vh", paddingTop: "1vh", float: 'right', paddingRight: '5vh' }}>
                <input type="text" placeholder="Search  from 'Name' " className="mr-2"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }} />
              </div>
              <h4 style={{ paddingBottom: '4px' }}>Top Story Headline</h4>

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

                    <div key={post._id}>

                      {(() => {
                        if (post.uploads === 'Top Story Headline') {
                          return (
                            <div style={{ paddingBottom: '1vh' }}>
                              <Card hoverable style={{ width: 1000 }}>
                                <Row>

                                  <Col span={9}>
                                    <img src={post.posttImage.imageSecURL} style={{ width: '40vh' }} />

                                  </Col>
                                  <Col span={15}>
                                    <h5>{post.name}</h5><br />
                                    <p>Description:</p>
                                    <textarea
                                      name="postContent"
                                      defaultValue={post.description}
                                      rows={4}
                                      cols={60}
                                      disabled
                                    />
                                    <h6>Added by :{post.email}</h6>

                                    <br />
                                  
                                  </Col>
                                </Row>
                              </Card>




                              <br />                            <br />

                            </div>
                          )
                        }
                      })()}


                     

                    </div>
                  );
                })}

              <CusPost />


            </div>

          </div>
        </Col>

      </Row>



    </div>
  );
}