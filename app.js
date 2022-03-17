const express = require("express");
const app = express();
const port = 8080;

// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

//sample data
const users = [
  {
    id: 1,
    name: "John Cena",
    age: "28",
  },
  {
    id: 2,
    name: "Dwayne Johnson",
    age: "32",
  },
];

//READ Request Handlers
app.get("/", (req, res) => {
  res.send("Welcome to Irfan's AWEsome REST api");
});
app.get("/users", (req, res) => {
  // Retrieves all users
  res.json({ users });
});

app.post("/create", (req, res) => {
  // Create a user
});

app.get("/user/:userID", (req, res) => {
  // Returns a user by ID
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
