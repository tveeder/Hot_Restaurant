

//   for the hot restaurant

// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Customers (DATA)
// =============================================================
var customers = [
  {
    name: "Yoda",
    email: "yoda@example.com",
    customerID: "yoda1234",
    phone_number: "1231231234"
  },
  {
    name: "Darth Maul",
    email: "darthmaul@email.com",
    customerID: "darth1234",
    phone_number: "2342342345"
  },
  {
    name: "Obi Wan Kenobi",
    email: "obi@example.com",
    customerID: "obi1234",
    phone_number: "9879879876"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Displays all characters
app.get("/api/customers", function (req, res) {
  return res.json(customers);
});

// Displays a single character, or returns false
app.get("/api/customers/:customer", function (req, res) {
  var chosen = req.params.customer;

  console.log(chosen);

  for (var i = 0; i < customers.length; i++) {
    if (chosen === customers[i].routeName) {
      return res.json(customers[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/customers", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCustomer);

  customers.push(newCustomer);

  res.json(newCustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
