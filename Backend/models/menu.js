const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const menuItemSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  taste: {
    type: String, 
    enum: ["sweet", "spicy", "sour"], // Fixed the enum values
    required: true
  },
  is_drink: {
    type: Boolean, 
    required: false
  },
  ingredients: {
    type: [String],
    default: []
  },
  num_sales: {
    type: Number, 
    default: 0
  }
});

// Create the model
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
