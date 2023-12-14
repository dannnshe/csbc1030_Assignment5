const express = require("express");
const fs = require("fs");
const app = express();
const port = 5001;

// Function to read users from the JSON file
function getUsers() {
  try {
    const data = fs.readFileSync("./users.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Route to get all users
app.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Route to get a user by id
app.get("/users/:id", (req, res) => {
  const users = getUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
