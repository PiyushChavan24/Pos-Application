/** @format */

const express = require("express");
const BillModel = require("../models/billModel");
const router = express.Router();

router.post("/charge-bill", async (req, res) => {
 try {
  console.log("Request Body:", req.body); // Log the request payload
  const newBill = new BillModel(req.body);
  await newBill.save();
  res.status(200).send("Bill charged successfully");
 } catch (error) {
  console.error("Error saving bill:", error);
  res
   .status(400)
   .json({ error: "Error charging bill", details: error.message });
 }
});
router.get("/get-all-bills", async (req, res) => {
 try {
  const bills = await BillModel.find();
  res.send(bills);
 } catch (error) {
  console.error("Error saving bill:", error);
  res
   .status(400)
   .json({ error: "Error charging bill", details: error.message });
 }
});
module.exports = router;
