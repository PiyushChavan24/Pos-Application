/** @format */
const dbconnnect = require("./dbconnect");
const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());
const itemsRoute = require("./routes/itemsRoute");
app.use("/api/items/", itemsRoute);
app.get("/", (req, res) => res.send("Hello, world!"));
app.listen(port, () =>
 console.log(`Hello, world! app is listening on port ${port}`)
);
