// Basic Lib Import
const express = require("express");
// const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database Lib Import
const mongoose = require("mongoose");
const router = require("./src/routes/api");

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Mongo DB Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager");

// Routing Implement
app.use("/api/v1", router);


app.get("/", (req,res)=>{res.json("Hello World")})
// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", data: "Route Not Found" });
});

module.exports = app;
