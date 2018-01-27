var express = require("express");
var app = express();
var compression = require('compression');
var router = express.Router();
var path = __dirname + "/public/views/";

app.use(compression());
app.use(express.static(__dirname + '/public', { maxage: '1d' }));

app.get("/", function (req, res) {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Expires", new Date(Date.now() + 86400).toUTCString());
    res.sendFile(__dirname + "/public/views/index.html");
  });

app.listen(3000, function () {
  console.log("Live at Port 3000");
});