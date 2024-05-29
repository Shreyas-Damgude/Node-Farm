const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require(`${__dirname}/app`);

// Configuration
dotenv.config({ path: `${__dirname}/config.env` });

// Database Connection
const DB = process.env.CONNECTION_STRING.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(DB).then(() => console.log("Connection Successful"));

// Server Listening
const port = process.env.PORT;

app.listen(port, "127.0.0.1", () => {
  console.log(`Running on port ${port}...`);
});
