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
    const [sales, setsales] = useState([]);
    const [count, setcount] = useState('');


    useEffect(() => {


             //get  funtion
             function GetSale() {
                axios.get("http://localhost:6500/api/vender/getchart").then((res) => {
                    console.log(res.data);
                    setsales(res.data);
                    setcount(res.data.length);
                }).catch((err) => {
                    alert(err.message);
                })
            }

        GetSale();
    }, [])
  return (
    <LineChart
      width={500}
      height={300}
      data={sales}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="datecaught" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="dayvolumechange"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="totalvolume" stroke="#82ca9d" />
    </LineChart>
  );
}
