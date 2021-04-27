const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res) {
    res.send("Hello");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})

// Extra basic info

// Basic render (render an ejs called "home" and send in data to a p element)
app.get("/", function (req, res) {
    res.render("home", {
      pContent1: homeStartingContent
    });
  })

  // sample ejs: "<p><%= pContent1 %> </p>"