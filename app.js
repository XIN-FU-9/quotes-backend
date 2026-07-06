// ============================================================
// QUOTES BACKEND
//
// Before you start:
//   1. Create a database named "quotes" in Postico or pgAdmin
//   2. Check your package.json and see what packages you need
//   3. Run: npm install sequelize pg pg-hstore
//   4. Complete db/index.js (database connection) first
//   5. Complete models/Quote.js (Quote model) second
//   6. Come back here last — this file depends on both
//
// To start the server: node app.js
// ============================================================

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ------------------------------------------------------------
// STEP 1 — Import your database connection and Quote model
// in the app.js using the routes/ path to import, this is the difer between import db-index.js
// such as this :Import Sequelize from the 'sequelize' package //
// const { Sequelize } = require("sequelize");
const db = require("./db");
// end

// Importing Quote here registers it with the connection so
// db.sync() below knows to create the Quotes table.
// this export a file not a object, don't use the destructure syntex {Quote}
// we can go back to db folder to check the index.js, at the last line.
const Quote = require("./models/quote"); // the name can be same, but it is not necessary.

// So now that we have the db, let's sync first before we start our api server
// Jump to the last line for STEP 2
// ------------------------------------------------------------

const app = express();
const PORT = 8080;

app.use(express.json()); // lets the server read JSON from req.body
app.use(morgan("dev")); // logs every incoming request
app.use(cors()); // allows the React frontend to call this server

// ============================================================
// ROUTES
// ============================================================

// ------------------------------------------------------------
// GET /api/quotes
//
// Return every quote from the database as an array.
// Hint: find the Sequelize method that fetches all rows from a table.
// ------------------------------------------------------------
app.get("/api/quotes", async (req, res, next) => {
  try {
    const getAllQuote = await Quote.findAll();
    // here need add more code
    res.json(getAllQuote);
  } catch (error) {
    next(error);
  }
});

// ------------------------------------------------------------
// POST /api/quotes
//
// Create a new quote using the data sent in the request body.
// Hint: what information do we want to accept in this route?
// Hint: how do we capture JSON information sent to the route?
//
// Hint: find the Sequelize method that inserts a new row and returns it.
// Send back status 201 and the new quote.
// ------------------------------------------------------------
app.post("/api/quotes", async (req, res, next) => {
  try {
    const createQuote = await Quote.create({
      ...req.body,
    });
    res.status(201).json(createQuote);
  } catch (error) {
    next(error);
  }
});

// ------------------------------------------------------------
// DELETE /api/quotes/:id
//
// Find the quote by its id, then remove it.
//
// Steps:
//   1. Get the id for the quote you want to delete
//   2. Find the quote by primary key using a sequelize method
//   3. If nothing comes back, send 404
//   4. Call the instance method that deletes the row
//   5. Send 204 — no body needed on a successful delete
// ------------------------------------------------------------
app.delete("/api/quotes/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const quote = await quetoe.findByPk(id);

    if (!quote) {
      return res.status(404).send("no quotes found");
    }
    // this for delete.
    quote.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// STRETCH ROUTES — come back to these after the three above work
// ============================================================

// GET /api/quotes/:id   — return a single quote by its id
// PATCH /api/quotes/:id — update a quote's text or author

// ============================================================
// ERROR HANDLER
//
// 4 parameters is how Express knows this is an error handler.
// Any route that calls next(error) lands here.
// ============================================================
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// ============================================================
// STEP 2 — Start the server
//
// db.sync() reads your models and creates any missing tables
// in PostgreSQL before the server starts accepting requests.
// Always await it before calling app.listen.
// ============================================================
async function startApp() {
  // connect to your db here before the express server listens
  try {
    await db.sync(); // we have to wait, until db connected, then run next line.

    // class note:
    // second way to code, when we don't add the async on the function.sync(),
    // db.sync()
    // .then() =>{},
    // .catch(er => {})

    // so the sync have to wrap up in a async function
    //async function dosomething() {
    // db.sync()
    // .then() =>{},
    // .catch(er => {})
    //}
    // end

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Synced database!");
  } catch (error) {
    console.error("Failed syned Database!");
  }
}

startApp();
