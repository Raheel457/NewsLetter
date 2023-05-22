// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.mail;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/56a6f0c780";
  const option = {
    method: "POST",
    auth: "RAHEEL:e4ce728d2f6a1fe58bdf91bc434d73b7-us12",
  };
  const request = https.request(url, option, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Served at port: 3000");
});

// API Key
// e4ce728d2f6a1fe58bdf91bc434d73b7-us12

// Audience ID
// 56a6f0c780
