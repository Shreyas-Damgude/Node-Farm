const fs = require("fs");
const Product = require(`${__dirname}/productModels`);
const catchAsync = require(`${__dirname}/catchAsync`);
const replaceTemplate = require(`${__dirname}/replaceTemplates`);

// CSS
const cssOverview = fs.readFileSync(
  `${__dirname}/css/style_overview.txt`,
  "utf-8"
);
const cssProduct = fs.readFileSync(
  `${__dirname}/css/style_product.txt`,
  "utf-8"
);

// HTML
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// Home Page
exports.getProducts = catchAsync(async function (request, response) {
  const products = await Product.find();
  const cardsHtml = products
    .map((ele) => replaceTemplate(tempCard, ele))
    .join("");
  let output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
  output = output.replace(/{%STYLE%}/g, cssOverview);
  response.status(200).end(output);
});

// Fetch a product
exports.showProduct = catchAsync(async function (request, response) {
  const [product] = await Product.find(request.query);
  if (!product) return new Error("Product Not Found");
  let output = replaceTemplate(tempProduct, product);
  output = output.replace(/{%STYLE%}/g, cssProduct);
  response.status(200).end(output);
});
