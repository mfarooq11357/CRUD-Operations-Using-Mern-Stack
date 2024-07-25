const express = require('express');
const Person = require('../models/person'); 

const personRouter = express.Router();

// Route to create a new person
personRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        
        console.log("Data saved successfully");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get all persons
personRouter.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

personRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Person deleted successfully");
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Internal error" });
    }
});
personRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPerson = await Person.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ error: "Person item not found" });
        }
        console.log("Person item updated successfully");
        res.status(200).json(updatedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = personRouter;
