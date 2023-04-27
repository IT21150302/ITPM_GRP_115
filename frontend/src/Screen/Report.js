import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, Card } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default function Reports() {

  const [isHover, setIsHover] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    window.location = "/";
  };
  const [allpost, setallpost] = useState([]);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  useEffect(() => {

    //get  funtion
    const Getallpost = async () => {
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
            setallpost(res.data.allpost);



          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };


    Getallpost();
  }, [])


  const generateorderReport = () => {
    const doc = new jsPDF();
    const title = "Guidlines Report";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);


    const headers = [
      [
        "",
        "Name",
        "Upload_Type",
        "Description",
        "Username",
        "Image",

      ],
    ];

    const data = allpost.map((allpost, index) => [
      index,
      allpost.name,
      allpost.uploads,
      allpost.description,
      allpost.username,
      'Have a Image',


    ]);
    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };
    doc.autoTable(contents);
    doc.save("detail_Report.pdf");
  };



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
                      Dashboard
                    </div>
                  </NavIcon>


                </NavItem>
              </Link><br />
              
              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "",
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
                      Support
                    </div>
                  </NavIcon>


                </NavItem>
              </Link><br />
              
              <br /><br />




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
                      Profile
                    </div>
                  </NavIcon>


                </NavItem>
              </Link><br />
              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                to={{
                  pathname: "/guidline",
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
                      Guidelines
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


              <Link
                style={{ textDecoration: 'none', color: 'black', fontSize: "10px" }}
                onClick={logOutHandler}
              >
                <NavItem eventKey="Settings">

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


        <Col span={18}   >

          <div style={{ paddingLeft: '15vh' }} >

            <div style={{ paddingLeft: '8vh', paddingTop: '15vh' }}>

              <Card hoverable style={{ width: '38rem', height: '15rem', background: '#b5d1e2' }} onClick={() => generateorderReport()}>
                <div style={{ paddingTop: '4rem', paddingLeft: '3vh' }}>

                  <h3 style={{ color: 'black' }}><span class="divider2">
                  </span> &nbsp;Click Here To Download  Detailed Report</h3>
                </div>
              </Card>

            </div>

          </div>
        </Col>

      </Row>



    </div>
  );
}