const express = require("express");
const { getProducts, showProduct } = require(`${__dirname}/productControllers`);

// Express app
const app = express();

// Middlewares
app.use(express.static(__dirname));

// Routes
app.route("/").get(getProducts);
app.route("/product").get(showProduct);

// Export
module.exports = app;
