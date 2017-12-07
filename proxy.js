'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('express-http-proxy');
const url = require('url');

//hostname and port of the target server
const server = process.env.SERVER || 'localhost:8088';
//port of this server
const port = process.env.PORT || 3120;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/*', proxy(server, {
  proxyReqPathResolver: (req) => url.parse(req.originalUrl).path,
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    console.log("----------Client Request Body----------")
    console.log(JSON.stringify(userReq.body, null, 2));

    console.log("----------Server Response Body----------")
    console.log(JSON.stringify(JSON.parse(proxyResData.toString('utf8')), null, 2));
    return proxyResData;
  }
}));

//app.get('/', function (req, res) {
//res.send(`Hello from Proxy on port ${port} and using target server: ${server}`);
//});

app.listen(port, function () {
  console.log(`Proxy listening on port ${port} and using target server: ${server}`);
});