import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import axios from "axios";



export default function Chartnew() {
    const [forcast, setforcast] = useState([]);


    useEffect(() => {


             //get  funtion
             function Getforcast() {
              const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
                axios.get("http://localhost:3001/api/forecast",config).then((res) => {
                    console.log(res.data.allforecast);
                    setforcast(res.data.allforecast);
                }).catch((err) => {
                    alert(err.message);
                })
            }

            Getforcast();
    }, [])
  return (
    <LineChart
      width={500}
      height={300}
      data={forcast}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="black"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="windspeed" stroke="red" />
    </LineChart>
  );
}
