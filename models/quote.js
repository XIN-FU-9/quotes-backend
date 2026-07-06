// ============================================================
// models/quote.js — Quote model
//
// YOUR TASKS:
//   1. Import DataTypes from 'sequelize'
const { DataTypes } = require("sequelize");
//   2. Import your db connection
const dbConnection = require("../db");
//   3. Define a Quote model with these fields:
// if the hover up on the dbConnection and define, if there aren't
// details pop up which means the db- index.js file is not connected.
const Quote = dbConnection.define("quote", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//
//      Field    Type      Constraint
//      -------  --------  --------------------
//      text     STRING    allowNull: false  (the quote itself)
//      author   STRING    allowNull: false  (who said it)
//
//      Sequelize adds id, createdAt, and updatedAt automatically.
//      Do not define them yourself.
//
//   4. Export the model
module.exports = Quote;
// this export a file not a object, don't use the destructure syntex {Quote}
// ============================================================
