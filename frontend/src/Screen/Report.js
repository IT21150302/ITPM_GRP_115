import React, { useState, useEffect } from "react";
import {  Row, Col, Avatar ,Card} from 'antd';
import SideNav, {  NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default function Reports() {
    const [image, setimage] = useState("");
    const [role, setrole] = useState("");
    const [isHover, setIsHover] = useState(false);
    const [username, setusername] = useState("");
   
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
      };
    const [license, setlicense] = useState([]);
    const handleMouseEnter = () => {
        setIsHover(true);
      };
      const handleMouseLeave = () => {
        setIsHover(false);
      };
    useEffect(() => {

        //get  funtion
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
                  setusername(res.data.profile.username);
                  setimage(res.data.profile.profilePicture.imageSecURL);
                  setrole(res.data.profile.role);
      
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


    const generateorderReport = () => {
        const doc = new jsPDF();
        const title = "License and Permits Data Summary";
        doc.setFontSize(15);
        doc.setTextColor(128, 0, 0);
        doc.text(title, 100, 10, null, null, "center");
        doc.setTextColor(0);
        doc.setFontSize(12);

        doc.setFontSize(8);
        doc.text(
            `*This Report is automatically generated.`,
            20,
            35,
            null,
            null
        );

        const headers = [
            [
                "",
                "Licence No",
                "Licence Type",
                "Issuing Agency",
                "Expiration",
                "Document",
                
            ],
        ];

        const data = license.map((license, index) => [
            index,
            license.licenceno,
            license.type,
            license.agency,
            license.expire,
            'Have a Document',
           

        ]);
        let contents = {
            startY: 20,
            head: headers,
            body: data,
        };
        doc.autoTable(contents);
        doc.save("License_detail_Report.pdf");
    };



    return (
        <div>

<Row>
            <Col span={6} style={{
              backgroundColor: "#b5d1e2", paddingBottom: '20%', background: '#b5d1e2',
            }}>

              <div onClick={logOutHandler} style={{ cursor: 'pointer', paddingTop: '2%', paddingLeft: '2%', color: 'black', fontWeight: 'bold' }}>
                <LogoutOutlined /> LogOut
              </div >


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
                  <h1 style={{ fontFamily: "Trirong", fontWeight: "bold", fontSize: "28px", color: "black" }}>{username}</h1>
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
                          style={{fontSize: "20px " }}

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
                          style={{fontSize: "20px " }}

                        >
                          Permits | Licence
                        </div>
                      </NavIcon>



                    </NavItem>
                  </Link><br />



                  <Link
                    style={{ textDecoration: 'none', color: 'black',  }}
                    to={{
                      pathname: "",
                    }}
                  >
                    <NavItem   eventKey="Fishing Quatos">

                      <NavIcon>

                        <div
                          className="box"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          style={{fontSize: "20px " }}
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
                          style={{fontSize: "20px " }}

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
                          style={{fontSize: "20px " }}

                        >
                          Settings</div>
                      </NavIcon>

                    </NavItem>
                  </Link><br />




                </div>
              </SideNav>
            </Col>


            <Col span={18}   >

            <div style={{ paddingLeft: '15vh' }} >
                
                <div style={{ paddingLeft: '8vh', paddingTop: '15vh' }}>
                    
                                <Card hoverable style={{ width: '38rem', height: '15rem', background: '#b5d1e2' }} onClick={() => generateorderReport()}>
                                    <div style={{ paddingTop: '4rem' ,paddingLeft:'3vh'}}>

                                         <h3 style={{ color:'black' }}><span class="divider2">
                    </span> &nbsp;Click Here To Download Licence and Permits Details Report</h3>
                                    </div>
                                </Card>
                       
                </div>

            </div>
</Col>

</Row>


            
        </div>
    );
}