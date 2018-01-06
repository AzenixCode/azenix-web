var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/public/views/';

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

app.use(express.static(__dirname + '/public'));

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.use("/", router);

app.use("*", function (req, res) {
  res.sendFile(path + "404.html");
});

app.listen(3000, function () {
  console.log("Live at Port 3000");
});

