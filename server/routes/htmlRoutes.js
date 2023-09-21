// Import the 'path' module to handle file paths
const path = require('path');

// Export a function that takes an 'app' instance as a parameter
module.exports = (app) =>
  // Define a route handler for HTTP GET requests to the root path ('/')
  app.get('/', (req, res) =>
    // Send the 'index.html' file as the response, using the 'path.join' method to construct the file path
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
