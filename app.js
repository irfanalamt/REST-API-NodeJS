const express = require("express");
const app = express();
const port = 8080;
const fetch = require("node-fetch");

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
  {
    id: 3,
    name: "Rey M",
    age: "36",
  },
  {
    id: 4,
    name: "Ricky Martin",
    age: "25",
  },
];

//READ Request Handlers
app.get("/", async (req, res) => {
  const resp = await fetch("https://complimentr.com/api");
  const temp1 = await resp.json();
  console.log(temp1);
  console.log(temp1.compliment);

  res.send("Welcome to Irfan's AWEsome REST api.\n" + temp1.compliment);
  console.log("/ endpoint hit");
});
app.get("/users", (req, res) => {
  // Retrieves all users
  res.json({ users });
  console.log("/users endpoint hit");
});
app.get("/users/:uid", (req, res) => {
  const id = parseInt(req.params.uid);
  console.log(`URL parameter = ${id}`);
  try {
    let user = users.find((user) => user.id === id);
    if (!user) {
      res.json({
        message: "User not found",
      });
    }

    res.json({ user });
  } catch (error) {
    res.json({
      message: "Failed to retrieve user",
    });
  }
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
