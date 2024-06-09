// const express = require('express');
// const dotenv = require('dotenv');//to use .env file/ environemtn varaibles env.PORT 
import express from 'express';//ES6
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
// import Message from './models/message.model.js';

dotenv.config({ path: '../.env' });

console.log('process.env', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;
console.log('process.env', process.env.PORT);



//allow us to extract this filed from req.body
app.use(express.json());//middleware to parse the incoming requests with JSON payloads (from POST requests.body)
app.use(cookieParser());//middleware to parse the incoming cookies

app.get('/', (req, res) => {
    //root route http://localhost:5000
    res.send('Hello0000000 gggWorld');
});

//when we visit this /api/auth route, we are going to call this routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});