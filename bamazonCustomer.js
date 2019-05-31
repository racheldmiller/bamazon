// List dependencies here

var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
require("console.table");

// Establish the connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root"
});

// constructor function used to create programmer objects
function Programmer(name, position, age, language) {
  this.name = name;
  this.position = position;
  this.age = age;
  this.language = language;
}
