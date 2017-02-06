var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var htmlRoutes = require("./routing/htmlRoutes.js");
var apiRoutes = require("./routing/apiRoutes.js");

var app = express();
var PORT = 7777;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname,'public/assets')));

// Routes

app.use('/', htmlRoutes);
app.use(apiRoutes);

// Starts the server
app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});


