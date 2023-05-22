import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
//Optional include of the default css styles
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import WeatherCard from './WeatherCard';
import Chartnew from './Chartnew';
const Main = () => {
   
    const [isHover, setIsHover] = useState(false);

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '7ad07aac9b0943040a4abdd2c23dfc4e',
        lat: '6.9271',
        lon: '79.8612',
        lang: 'en',
        unit: 'metric',
    });


    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    useEffect(() => {

        //get funtion

        const getcast = async () => {
          
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=Colombo&units=metric&appid=1f938a6740ff6fb79c06cc531fa0b5b5`)
                .then(res => {
                    const data = res.data
                   

                })
                .catch(err => console.log(err))
        }


   


        getcast();
    }, [])

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
      };

    return (
        <div >
           
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
                    <div >
                        <ReactWeather
                            isLoading={isLoading}
                            errorMessage={errorMessage}
                            data={data}
                            lang="en"
                            locationLabel="Colombo, LK"
                            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                            showForecast
                        />

                        <Row>
                            <Col span={10}> 
                                <div>

                                    <WeatherCard />
                                </div>
                            </Col>
                            <Col span={14}>
                                <div style={{paddingTop:'5vh'}}>
                                <Chartnew/>                            
                                </div>
                            </Col>

                        </Row>



                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Main;
