const express = require("express");
const app = express();
const port = 8080;

//READ Request Handlers
app.get("/", (req, res) => {
  res.send("Welcome to Irfan's AWEsome REST api");
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
