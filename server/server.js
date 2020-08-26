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

const app = express();

app.use(morgan("dev"));

app.use(express.json());

const port = process.env.PORT || 4001;


// get all recipes
app.get("/api/recipes", async (req, res) => {
	console.log("Get all recipes");

	const recipes = await db.query("select * from recipes");

	res.status(200).json({
		status: "success, get landing",
		data: {
			recipes: [recipes.rows],
			code: []
		}
	});
});

// get a recipe by an id
app.get("/api/recipes/:id", async (req, res) => {
	console.log("Get recipe by id");
	console.log(req.params);
	res.status(200).json({
		status: "success, get by id",
		data: {
			recipes: [req.params],
			code: []
		}
	});
});

// create a recipe
app.post("/api/recipes", (req, res) => {
	console.log(req.query);
	res.status(201).json({
		status: "success, create",
		data: {
			query: req.query,
			code: []
		}
	});
});

// update recipe
app.put("/api/recipes/:id", (req, res) => {
	console.log(req);
	res.status(200).json({
		status: "success, update",
		data: {
			query: req.params,
			code: []
		}
	});
});

// delete recipe
app.delete("/api/recipes/:id", (req, res) => {
	console.log("In delete");
	res.status(204).json({
		status: "success, delete",
		data: {
			query: req.params,
			code: []
		}
	});
});



app.listen(port, () => {
	console.log(`The server is up and running on port ${port}`);
});