var express = require("express");
var app = express();
var compression = require('compression');
var router = express.Router();
var path = __dirname + "/public/views/";

app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/dist/views/index.html");
  });

app.listen(3000, function () {
  console.log("Live at Port 3000");
});