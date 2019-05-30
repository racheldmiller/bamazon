// dependency for inquirer npm package
var inquirer = require("inquirer");

// constructor function used to create programmer objects
function Programmer(name, position, age, language) {
  this.name = name;
  this.position = position;
  this.age = age;
  this.language = language;
}
