'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('express-http-proxy');

const app = express();
//hostname and port of the target server
const server = process.env.SERVER || 'http://localhost:8088';
//port of this server
const port = process.env.PORT || 3120;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/*', proxy(server, {
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    console.log("----------Client Request Body----------")
    console.log(JSON.stringify(userReq.body));
    console.log("----------Server Response Body----------")
    console.log(JSON.parse(proxyResData.toString('utf8')));
    return proxyResData;
  }
}));

//app.get('/', function (req, res) {
//res.send(`Hello from Proxy on port ${port} and using target server: ${server}`);
//});

app.listen(port, function () {
  console.log(`Proxy listening on port ${port} and using target server: ${server}`);
});