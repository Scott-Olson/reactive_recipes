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

const path = require('path');


const app = express();


const port = process.env.PORT || 4001;

app.listen(port, () => {
	console.log(`The server is up and running on port ${port}`);
});

// get all recipes
app.get("/", (req, res) => {
	res.json({
		status: "success",
		recipes: []
	})
});

app.get("/", (req, res) => {
	console.log("Get all recipes");
});

app.get("/", (req, res) => {
	console.log("Get all recipes");
});