const path = require('path'); // 1. Import the 'path' module

require('dotenv').config( );
require('./db/mongoose');

console.log('MongoDB URI:', process.env.MONGO_URI);
const express = require('express');
const userRouter = require('./routers/user'); // 1. Import the user router

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // 2. This configures express to automatically parse JSON
app.use(userRouter);     // 3. Register the user router with the app

// A simple route to test our server
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the TaskTrek API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});