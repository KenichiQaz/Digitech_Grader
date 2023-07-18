
function validateJS(file) {
    // Perform JavaScript validation logic here
    const fs = require('fs');
    const esprima = require('esprima');
    // Example validation result
    var isValid = true;
    var jsResult = document.createElement("div");
    fs.readFile(file, 'utf8', (err, code) => {
      if (err) {
        console.log('Error reading file:', err);
        return;
      }
  
      try {
        // Parse the code using Esprima
        const parsedCode = esprima.parseScript(code);
        // If parsing is successful, the code is valid
        console.log('Code is valid');
        jsResult.className = "success";
        jsResult.textContent = "JavaScript Validation: Passed";
      } catch (error) {
        // If parsing fails, the code is invalid
        console.log('Code is invalid:', error.message);
        jsResult.className = "error";
        jsResult.textContent = "JavaScript Validation: Failed \n" + error.message;
      }
    });
  
    jsResult.className = isValid ? "success" : "error";
    jsResult.textContent = "JavaScript Validation: " + (isValid ? "Passed" : "Failed");
    document.getElementById("results").appendChild(jsResult);
  
  
  
  
  
    function parseGitHubLink(githubLink) {
      const sqlite3 = require('sqlite3').verbose();
      // Parse the username and repository name from the GitHub link
      const regex = /github.com\/([^/]+)\/([^/]+)/;
      const match = githubLink.match(regex);
  
      if (!match) {
        console.log('Invalid GitHub link');
        return;
      }
  
      const username = match[1];
      const repository = match[2];
  
      // Connect to the SQLite database
      const db = new sqlite3.Database('github.db');
  
      // Create a table if it doesn't exist
      db.run(`
      CREATE TABLE IF NOT EXISTS repositories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        repository TEXT,
        HTMLResult TEXT,
        CSSResult TEXT,
        JSResult TEXT
      )
    `);
  
      // Insert the parsed username and repository into the database
      db.run(`
      INSERT INTO repositories (username, repository, HTMLResult, CSSResult, JSResult)
      VALUES (?, ?, ?, ?, ?)
    `, [username, repository, HTMLResult, CSSResult, JSResult], function (err) {
        if (err) {
          //dbresults
          document.getElementById("dbresults").appendChild('Error inserting data into the database:' + err);
        } else {
          document.getElementById("dbresults").appendChild('Data inserted successfully');
        }
        // Close the database connection
        db.close();
      });
    }
  }