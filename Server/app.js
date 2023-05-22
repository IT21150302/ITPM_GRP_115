// Import all dependencies
const dotenv = require('dotenv');
const express = require('express');

const cookieParser = require('cookie-parser');
var cors = require('cors');


const app = express();

// Configure ENV File & Require Connection File
dotenv.config({path : './config.env'});
require('./db/conn');
const port = process.env.PORT;

// Require Model
const Message = require('./models/msgSchema');
const authenticationRoutes = require("./router/authentication-routes");
const forecastRoutes = require("./router/forecast-routes");

// These Methods are Used to Get Data and Cookies from Frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello World");
})
app.use("/auth", authenticationRoutes);
app.use("/api", forecastRoutes);



// Message
app.post('/message', async (req, res) => {
    try {
        // Get body or Data
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMsg = new Message({
            name : name,
            email : email,
            message : message
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash
        // Because of Hashing. After Hash, It will save to DB
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error);
    }
})



// Run server
app.listen(port, () => {
    console.log("Server is listening");
})