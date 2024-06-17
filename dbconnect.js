/** @format */

const mongoose = require("mongoose");

const URl =
 "mongodb+srv://piyushchavan24:Piyu@123sh@cluster0.jaak8t0.mongodb.net/retail-store";

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

let connectionObj = mongoose.connection;
connectionObj.on("connected", () => {
 console.log("Mongo DB connection established");
});

connectionObj.on("error", (error) => {
 console.log("MongoDB connection error", error);
});
