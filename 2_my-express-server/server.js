const express = require("express");

const app = express();

app.get("/", function(request, response) {
    response.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: attila.szabo.vrc@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("<table><thead><th>Name</th><th>Age</th></thead><tbody><tr><td>Attila Szabó</td><td>36</td></tr></tbody></table><ul><li>List item 1</li><li>List item 2</li><li>List item 3</li><li>New Item</li></ul>");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});