const express = require("express");
const app = express();

const port = process.env.PORT || 3121;
app.listen(port, function () {
    console.log(`Testserver app listening on port ${port}!`);
});

app.all('*', function (req, res) {
    let response = `Hello world From testserver on port: ${port}`;
    res.send(JSON.stringify(response));
});