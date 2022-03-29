const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");
const { nextTick } = require("process");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Error handler middleware
app.use((err, req, res, next) => {
  console.log(`Error handler ${err}`);
  res.status(500);
  res.send("response from error handler");
});

const readFromFile = (req, res, next) => {
  fs.readFile("sample-data.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error while reading file", err);
      return next(err);
    } else {
      res.locals = data;
      return next();
    }
  });
};

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

app.get("/user", readFromFile, (req, res) => {
  //Get all users in the database
  res.send(res.locals);
});

app.post("/user", (req, res, next) => {
  // Create a user by sending a JSON object
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
          return next("POST request ERROR");
        }
      });
    }
  });
  console.log(req.body);
  res.render("success", { msg: "POST request success. Item inserted." });
});

app.get("/user/:userID", readFromFile, (req, res, next) => {
  // Returns a user by ID

  let tempData = JSON.parse(res.locals);
  const findValue = tempData.find((element) => element.id == req.params.userID);

  if (!findValue) return next("ID match NOT found!");
  else {
    res.json(findValue);
  }
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
