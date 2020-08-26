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

const app = express();

app.use((req, res, next) => {
	console.log("hit the middleware");
	next();
});

const port = process.env.PORT || 4001;


// get all recipes
app.get("/api/recipes", (req, res) => {
	console.log("Get all recipes");
	res.json({
		status: "success, get landing",
		data: {
			recipes: [],
			code: []
		}
	});
});

// get a recipe by an id
app.get("/api/recipes/:id", (req, res) => {
	console.log("Get recipe by id");
	console.log(req.params);
	res.json({
		status: "success, get by id",
		data: {
			recipes: [],
			code: []
		}
	});
});

// create a recipe
app.post("/api/recipes", (req, res) => {
	console.log(req.query);
	res.json({
		status: "success, create",
		data: {
			query: req.query,
			code: []
		}
	});
});



app.listen(port, () => {
	console.log(`The server is up and running on port ${port}`);
});