// const express = require('express');
// const dotenv = require('dotenv');//to use .env file/ environemtn varaibles env.PORT 
import path from 'path';
import express from 'express';//ES6
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
// import Message from './models/message.model.js';

import { app, server } from './socket/socket.js';

dotenv.config({ path: '../.env' });


// const app = express();
const PORT = process.env.PORT || 8000;

//_dirname is the current directory name
const _dirname = path.resolve();



//allow us to extract this filed from req.body
app.use(express.json());//middleware to parse the incoming requests with JSON payloads (from POST requests.body)
app.use(cookieParser());//middleware to parse the incoming cookies

//when we visit this /api/auth route, we are going to call this routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//purpose: to serve the static files from the React app
app.use(express.static(path.join(_dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    //serve the index.html file     
    res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));    
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});