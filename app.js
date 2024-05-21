const fs = require("fs");
const url = require("url");
const http = require("http");
const express = require("express");
const replaceTemplate = require("./modules/replaceTemplate");

const css_overview = fs.readFileSync(
  `${__dirname}/css/style_overview.txt`,
  "utf-8"
);

const css_product = fs.readFileSync(
  `${__dirname}/css/style_product.txt`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  // Overview
  if (pathname === "/") {
    response.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObject
      .map((ele) => replaceTemplate(tempCard, ele))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    response.end(output.replace(/{%STYLE%}/g, css_overview));

    // Product
  } else if (pathname === "/product") {
    response.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    response.end(output.replace(/{%STYLE%}/g, css_product));

    // API
  } else if (pathname === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(data);

    // Not Found
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    response.end("<h1>Page Not Found!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {});
