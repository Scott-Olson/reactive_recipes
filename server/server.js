require("dotenv").config();
const express = require("express");
// logging middleware
const morgan = require('morgan');
// security middleware
const helmet = require('helmet');
// rate limitting middleware
const rateLimit = require('express-rate-limit');
// slowdown middleware
const slowDown = require('express-slow-down');
// path middleware
const path = require('path');
// postgres connection
const db = require("./db");

const cors = require("cors");

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 4001;


// get all recipes
app.get("/api/recipes", async (req, res) => {
	console.log("Get all recipes");

	try {

		const results = await db.query("select * from recipes");

		res.status(200).json({
			status: "success, get landing",
			results: results.rows.length,
			data: {
				recipes: results.rows,
				code: []
			}
		});
	} catch (err) {
		res.status(500).json({
			status: "none found, get landing",
			results: 0,
			data: {
				recipes: [],
				code: []
			}
		});
	}
});

// get a recipe by an id
app.get("/api/recipes/:id", async (req, res) => {
	console.log("Get recipe by id");

	try {
		// parameterized query
		const results = await db.query("select * from recipes where id = $1", [req.params.id]);

		res.status(200).json({
			status: "success, get by id",
			results: results.rows.length,
			data: {
				recipes: results.rows,
				code: []
			}
		});

	} catch (err) {
		res.status(500).json({
			status: "none found, get id",
			results: 0,
			data: {
				recipes: [],
				code: []
			}
		});
	}
});

// create a recipe
app.post("/api/recipes", async (req, res) => {
	console.log(req.query);
	try {
		// insert into table, "returning *" gives us the new entry
		const results = await db.query("INSERT INTO recipes (id, creator, origin) values ($1, $2, $3) returning *", [req.query.id, req.query.creator, req.query.origin]);
		console.log(results);
		res.status(201).json({
			status: "success, create",
			data: {
				results: results.rows,
				code: []
			}
		});
	} catch (error) {
		console.log("Error on create")
	}
});

// get recipe for update
app.get("/api/recipes/:id/update", async (req, res) => {
	console.log("Get recipe by id for update");

	try {
		// parameterized query
		const results = await db.query("select * from recipes where id = $1", [req.params.id]);

		res.status(200).json({
			status: "success, get by id for update",
			results: results.rows.length,
			data: {
				recipes: results.rows,
				code: []
			}
		});

	} catch (err) {
		res.status(500).json({
			status: "none found, get id",
			results: 0,
			data: {
				recipes: [],
				code: []
			}
		});
	}
});

// update recipe
app.put("/api/recipes/:id", async (req, res) => {
	console.log(req.query)
	try {
		// be sure to set default values in the form for all this
		const results = await db.query("UPDATE recipes SET id = $1, creator = $2, origin = $3 where id = $4 returning * ", [req.params.id, req.query.creator, req.query.origin, req.params.id]);

		res.status(200).json({
			status: "success, update by id",
			results: results.rows.length,
			data: {
				recipes: results.rows[0],
				code: []
			}
		});

	} catch (err) {
		res.status(500).json({
			status: "none found, update",
			results: 0,
			data: {
				recipes: [],
				code: []
			}
		});
	}
});

// delete recipe
app.delete("/api/recipes/:id", async (req, res) => {
	try {
		const results = await db.query("DELETE FROM recipes where id = $1", [req.params.id]);
		console.log("In delete");
		res.status(204).json({
			status: "success, delete",
			data: {
				query: req.params,
				code: []
			}
		});

	} catch (error) {
		console.log("delete error")
	}
});



app.listen(port, () => {
	console.log(`The server is up and running on port ${port}`);
});