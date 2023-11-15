// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Citizen, Title } = require('./models'); // Adjust the path based on your project structure

const app = express();
const port = 3000; // Choose a port of your choice

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML files are in a 'public' directory

// Connect to MongoDB
mongoose.connect('mongodb+srv://buyinzajoshua:Joshua20.@cluster0.btjnbey.mongodb.net/BLB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const path = require('path');

// Routes
app.get('/', (req, res) => {
  // Serve your HTML file
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/create-citizen', (req, res) => {
  // Handle form posts for adding citizens
  const { firstName, lastName, age } = req.body;

  const newCitizen = new Citizen({
    firstName,
    lastName,
    age,
  });

  newCitizen.save((err) => {
    if (err) {
      console.error('Error saving citizen:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/getCitizens', (req, res) => {
  // Handle form gets for retrieving citizen data
  Citizen.find({}, (err, citizens) => {
    if (err) {
      console.error('Error fetching citizens:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(citizens);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000/`);
});
