// ============================================================
// db/index.js — Sequelize connection
//
// Before you start:
//   Run this in quotes-backend: npm install sequelize pg pg-hstore
//   Then create a "quotes" database in Postico or pgAdmin.


// YOUR TASKS:
//   1. Import Sequelize from the 'sequelize' package
import {Sequelize} from ("sequelize"); 
// const {Sequelize} = ("sequelize");
//   2. Create a new Sequelize instance connected to your quotes database
//      Use this connection string: postgres://localhost:5432/quotes
const dbConnection = new Sequelize("postgrespostgres://localhost:5432/quotes:")
//   3. Export the sequelize database instance
Module.exports(dbConnection);
// Every other file that needs the database imports from here.
// Never create a second Sequelize connection in another file.
// ============================================================
