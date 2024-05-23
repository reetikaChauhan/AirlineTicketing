const express = require("express");
const cors = require('cors');
const routes = require("./routes");

const server = express();
// Configure CORS
server.use(cors({
    origin: 'http://localhost:4000', // Allow requests from your frontend or any other origin you specify
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
server.use(express.json());

server.use(routes);

module.exports = server;