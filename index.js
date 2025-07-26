const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// A simple route to test our server
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the TaskTrek API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});