// Import the 'Workbox' class from the 'workbox-window' library
import { Workbox } from 'workbox-window';

// Import the 'Editor' class from the './editor' module
import Editor from './editor';

// Import the './database' module
import './database';

// Import the '../css/style.css' stylesheet
import '../css/style.css';

// Get a reference to the 'main' element in the HTML document
const main = document.querySelector('#main');

// Clear the contents of the 'main' element
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Create an instance of the 'Editor' class
const editor = new Editor();

// Check if 'editor' is undefined
if (typeof editor === 'undefined') {
  // If 'editor' is undefined, display a loading spinner
  loadSpinner();
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Create a new instance of 'Workbox' and specify the service worker file to register
  const workboxSW = new Workbox('/src-sw.js');

  // Register the service worker with Workbox
  workboxSW.register();
} else {
  // Log an error message to the console if service workers are not supported in the browser
  console.error('Service workers are not supported in this browser.');
}
