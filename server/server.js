const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));

// Health insights API endpoint
app.get('/api/health-insights', (req, res) => {
  // TODO: Implement Azure Health Insights API integration
  res.json({ message: 'Health Insights API endpoint placeholder' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
