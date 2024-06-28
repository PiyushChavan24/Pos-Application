/** @format */

const express = require("express");
const ItemsModel = require("../models/itemsModel");
const router = express.Router();
router.get("/get-all-items", async (req, res) => {
 try {
  const items = await ItemsModel.find();
  res.send(items);
 } catch (error) {
  res.status(400).json(error);
 }
});

router.post("/add-items", async (req, res) => {
 try {
  const newitem = new ItemsModel(req.body);
  await newitem.save();
  res.send("Item added successfully");
 } catch (error) {
  res.status(400).json(error);
 }
});
module.exports = router;
