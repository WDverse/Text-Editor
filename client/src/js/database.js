// Import the 'openDB' function from the 'idb' library
import { openDB } from "idb";

// Define an asynchronous function for initializing the IndexedDB database
const initdb = async () =>
  // Open or create an IndexedDB database named "jate" with version 1
  openDB("jate", 1, {
    // Define an upgrade callback function that runs when the database version changes
    upgrade(db) {
      // Check if the object store "jate" already exists in the database
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return; // If it exists, do nothing and return
      }

      // If the "jate" object store doesn't exist, create it with a keyPath of "id" and auto-incrementing keys
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });

      // Log a message indicating that the "jate" database has been created
      console.log("jate database created");
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Updated the database");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, jate: content });

  // Get confirmation of the request.
  const result = await request;
  console.log(" Data saved to the database", result);
};

// Gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  result
    ? console.log("Data retrieved from the database", result.value)
    : console.log("Data not found in the database");
  // Check if a variable is defined and if it is, return it.
  return result?.value;
};

initdb();
