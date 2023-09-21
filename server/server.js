// Import the Express.js library
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on, using the environment variable PORT if available, or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse URL-encoded data in incoming requests
app.use(express.urlencoded({ extended: true }));

// Parse JSON data in incoming requests
app.use(express.json());

// Require and configure the HTML routes by passing the 'app' instance to the 'htmlRoutes' module
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port, and log a message when the server starts
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
