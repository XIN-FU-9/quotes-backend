// ============================================================
// db/index.js — Sequelize connection
//
// Before you start:
//   Run this in quotes-backend: npm install sequelize pg pg-hstore
//   Then create a "quotes" database in Postico or pgAdmin.

// YOUR TASKS:
//   1. Import Sequelize from the 'sequelize' package
const { Sequelize } = require("sequelize");

// import {Sequelize} = "sequelize"
// const {Sequelize} = ("sequelize"); // compare two lines. what is differ.
// end these are wrong way to code of import sequelize from the 'sequelize' package

//   2. Create a new Sequelize instance connected to your quotes database
//      Use this connection string: postgres://localhost:5432/quotes
const db = new Sequelize("postgres://localhost:5432/quotes");
//   3. Export the sequelize database instance
// the module is lowercase
module.exports = db;
// Every other file that needs the database imports from here.
// Never create a second Sequelize connection in another file.
// ============================================================
