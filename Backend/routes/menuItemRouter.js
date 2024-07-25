const express = require('express');
const MenuItem = require('../models/menu'); // Adjust the path to your MenuItem model

const menuItemRouter = express.Router();

// Route to create a new menu item
menuItemRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        
        console.log("Data saved successfully");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get all menu items
menuItemRouter.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to update a menu item by ID
menuItemRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        console.log("Menu item updated successfully");
        res.status(200).json(updatedMenuItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = menuItemRouter;
