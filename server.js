const express = require('express');
const projectRouter = require('./ProjectRouter/projectRouter');
const actionRouter = require('./ActionRouter/actionRouter');

const server = express();
server.use(express.json());

server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Server is up and running</h2>`)
});



module.exports = server;