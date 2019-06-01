// List dependencies here
var mysql = require("mysql");
var inquirer = require("inquirer");
// var chalk = require("chalk"); // nice tool I installed, but can incorporate later
require("console.table");

// Establish the connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

// App first displays all of the items available for sale.
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  itemsForSale();
});

// Include the ids, names, and prices of products for sale.
function itemsForSale() {
  console.log("Look at these options!");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      buyById(res); // placement here for asynchronicity
    }
  });
}

function buyById(inventory) {
  inquirer
    .prompt({
      name: "item_id",
      type: "input",
      message: "Pick the ID of the products you'd like to buy"
    })
    .then(function(answer) {
      var choiceId = parseInt(answer.item_id);
      var product = checkInventory(inventory, choiceId);
      if (product) {
        // console.log("works");
        quantity(product);
      } else {
        console.log("product not found");
      }
    });
}

function checkInventory(inventory, choiceId) {
  // sub "val" for "inventory" to make it easier for me to visualize it
  for (var i = 0; i < inventory.length; i++) {
    if (choiceId === inventory[i].item_id) {
      // console.log(inventory[i]);
      return inventory[i];
    }
  }
  return null;
}

function quantity(product) {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many units would you like to buy?"
    })
    .then(function(answer) {
      var amount = parseInt(answer.quantity);
      // console.log(amount);
      if (amount > product.stock_quantity) {
        console.log("Insufficient quantity!");
        itemsForSale(); // instead of doing connection.end(); right away
      } else {
        schmoney();
      }
    });
}

function schmoney(choiceID, amount) {
  var choiceID = answer.item_id;
  var amount = answer.quantity;
  connection.query(
    "SELECT * FROM products WHERE item_id =" + choiceID,
    function(err, res) {
      if (err) throw err;
      var stockAmt = results[0].stock_quantity;
      if (stockAmt >= amount) {
        var updateStock = stockAmt - amount;
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ?" +
            updateStock +
            "WHERE item_id = ?" +
            answer,
          function(err, res) {
            if (err) throw err;
            else {
              console.log("Thanks for your purchase!");
            }
          }
        );
      } else {
        console.log("Insufficient quantity!");
      }
    }
  );
}

// need to test the schmoney function.
