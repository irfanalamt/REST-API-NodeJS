const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//READ Request Handlers
app.get("/compliment", async (req, res) => {
  const resp = await fetch("https://complimentr.com/api");
  const temp1 = await resp.json();
  console.log(temp1.compliment);
  res.render("compliment", temp1);
  console.log("/compliment endpoint hit");
});
app.get("/", (req, res) => {
  res.render("index");

  console.log("/ endpoint hit");
});

app.get("/user", (req, res) => {
  fs.readFile("sample-data.json", "utf8", function (err, data) {
    if (err) console.log("Error while reading file", err);
    else {
      res.send(data);
    }
  });
});

app.post("/user", (req, res) => {
  // Create a user
  fs.readFile("sample-data.json", "utf8", function (err, data) {
    if (err) console.log("Error while reading file", err);
    else {
      let tempData = JSON.parse(data);
      console.log(typeof req.body);
      tempData.push(req.body);
      console.log(tempData);
      fs.writeFile("sample-data.json", JSON.stringify(tempData), (err) => {
        if (err) {
          console.log("Error while writing file", err);
          res.send("POST request ERROR");
        }
      });
    }
  });
  console.log(req.body);
  res.render("success", { msg: "POST request success. Item inserted." });
});

app.get("/user/:userID", (req, res) => {
  // Returns a user by ID
  fs.readFile("sample-data.json", "utf8", function (err, data) {
    if (err) console.log("Error while reading file", err);
    else {
      let tempData = JSON.parse(data);
      const findValue = tempData.find(
        (element) => element.id == req.params.userID
      );

      if (!findValue) res.send("ID match NOT found!");
      else {
        res.json(findValue);
      }
    }
  });
});
app.put("/user/:userID", (req, res) => {
  // Update a user by ID
});
app.delete("/delete/:userID", (req, res) => {
  // Delete a user by ID
});
app.delete("/users", (req, res) => {
  // Delete all users
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
