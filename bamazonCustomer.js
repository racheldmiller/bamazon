// List dependencies here

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
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
  console.log("Want to buy these?");
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
  // sub "val" for "inventory"
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
        itemsForSale();
      }
    });
}

// next steps
// function toBuy (to make an actual purchase)
// update sql query

// The app should then prompt users with two messages.
// 1st: ID of product they want to buy.
// 2nd: how many units of product they'd want to buy.

// Once the customer has placed the order, your application should check if your store has enough
// of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
