const express = require('express');
const router = require('../router/router.js');

const server = express();

server.use('/api/posts', router);

module.exports = server;