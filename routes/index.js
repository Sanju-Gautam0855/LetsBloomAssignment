const express = require("express");
const router = express.Router();
const DataSchema = require("../model/Schema");

router.get("/", (req, res) => {
  res.send("hii this is a book management API by 20JE0855");
});

router.get("/api/books", async (req, res) => {
    try {
      const sort = { name: 1 };
  
      const getData = await DataSchema.find({}).sort(sort);
        if (!getData || getData.length === 0) {
        return res.status(404).send("No data found");
      }
      res.send(getData);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Error:", error.message);
        res.status(400).send(`Validation Error: ${error.message}`);
      } else if (error.name === "CastError") {
        console.error("Cast Error:", error.message);
        res.status(400).send(`Cast Error: ${error.message}`);
      } else {
        console.error("Error fetching data from the database:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
  

  
  router.put("/api/books/:book_id", async (req, res) => {
    try {
      const book_id = req.params.book_id;
  
      const existingRecord = await DataSchema.findOne({ book_id });
  
      if (!existingRecord) {
        return res.status(404).send("Book not found");
      }
  
      existingRecord.set(req.body);
  
      await existingRecord.validate();
  
      const updatedRecord = await existingRecord.save();
  
      res.send(updatedRecord);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Error:", error.message);
        res.status(400).send(`Validation Error: ${error.message}`);
      } else {
        console.error("Error updating record in the database:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
  
  

router.post("/api/books", async (req, res) => {
    try {
      const addRecord = new DataSchema(req.body);
      await addRecord.validate();
  
      const existingRecord = await DataSchema.findOne({ book_id: addRecord.book_id });
      if (existingRecord) {
        return res.status(400).send("Same book already exists");
      }
  
      await addRecord.save();
  
      res.status(201).send(addRecord);
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Error:", error.message);
        res.status(400).send(`Validation Error: ${error.message}`);
      } else {
        console.error("Error adding record to the database:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
  

  router.delete("/api/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      const deleteRecord = await DataSchema.findByIdAndDelete(id);
  
      if (!deleteRecord) {
        return res.status(404).send("Record not found");
      }
  
      res.send(deleteRecord);
    } catch (error) {
      console.error("Error deleting record from the database:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;