const express = require('express');
const projectRouter = require('./ProjectRouter/projectRouter');

const server = express();
server.use(express.json());

server.use('/api/project', projectRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Server is up and running</h2>`)
});



module.exports = server;