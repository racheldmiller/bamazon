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
      // console.log("answer ====> ", answer);
      var choiceId = parseInt(answer.item_id);
      var product = checkInventory(inventory, choiceId);
      // console.log(product);
      if (product) {
        // console.log("works");
        quantity(choiceId, product);
      } else {
        console.log("product not found");
      }
    });
}

function checkInventory(inventory, choiceId) {
  // console.log("inventory ", inventory);
  // console.log("choice id :", choiceId);
  // sub "val" for "inventory" to make it easier for me to visualize it
  for (var i = 0; i < inventory.length; i++) {
    // console.log("item id :", inventory[i].item_id);
    if (choiceId === inventory[i].item_id) {
      // console.log(inventory[i]);
      return inventory[i];
    }
  }
  return null;
}

function quantity(choiceId, product) {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many units would you like to buy?"
    })
    .then(function(answer) {
      // console.log("answer ====> ", answer);
      // var choiceId = parseInt(answer.item_id);
      var amount = parseInt(answer.quantity);
      // console.log("it works", choiceId);
      if (amount > product.stock_quantity) {
        console.log("Insufficient quantity!");
        itemsForSale(); // instead of doing connection.end(); right away
      } else {
        purchaseAndUpdate(choiceId, amount);
      }
    });
}

function purchaseAndUpdate(choiceId, amount) {
  // var choiceID = answer.item_id;
  console.log("choice id :", choiceId);

  // var amount = answer.quantity;
  connection.query(
    "SELECT * FROM products WHERE item_id =" + choiceId,
    function(err, res) {
      if (err) throw err;
      // console.log("res =====>", res);
      var stockAmt = parseInt(res[0].stock_quantity);
      if (stockAmt >= amount) {
        updateStock = parseInt(stockAmt - amount);
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ?  WHERE item_id = ?",
          [amount, choiceId], // question marks replaced by what we're placing in here
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
      itemsForSale();
    }
  );
}
