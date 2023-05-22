import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";
//Optional include of the default css styles
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import WeatherCard from './WeatherCard';
import Chartnew from './Chartnew';
import Navbar from '../components/Navbar';


const Maindash = () => {
   
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
    
    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);
    
      };
    
      const enterKeyPressed = (e) => {
        if (e.keyCode === 13) {
          setCity(e.currentTarget.value);
          e.currentTarget.blur();
        }
      };

    return (
        
        <div>
            
      <Navbar/>
       

    



      <div className="overlay">
              <div className="container2">
              <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick = {(e)=>handleUnitsClick(e)}>°F</button>
              </div>
              </div>
              </div>
        <div  style={{
            backgroundColor: "#b5d1e2",paddingBottom:"30vh",paddingTop:'5vh',paddingLeft:'5vh'
        }}>
            
            <Row>
     <Col span={12}>
     <ReactWeather
                            isLoading={isLoading}
                            errorMessage={errorMessage}
                            data={data}
                            lang="en"
                            locationLabel="Colombo, LK"
                            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                            showForecast
                        />
     </Col>
                <Col span={12} style={{
                    backgroundColor: "#b5d1e2"
                }}>
                    <div >
               

                                <div>

                                    <WeatherCard />
                                </div>
                               




                    </div>
                </Col>
            </Row>
     
        </div></div>
    );
};

export default Maindash;
