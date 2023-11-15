// models.js

const mongoose = require('mongoose');

// Citizen Schema
const citizenSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

// Title Schema
const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

// Convert the schemas into models
const Citizen = mongoose.model('Citizen', citizenSchema);
const Title = mongoose.model('Title', titleSchema);

// Export the models as modules
module.exports = {
  Citizen,
  Title,
};


