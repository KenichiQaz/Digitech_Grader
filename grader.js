document.getElementById("validationForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var githubLink = document.getElementById("githubLink").value;
  validateFiles(githubLink);
});

function validateFiles(githubLink) {
  var htmlFile = githubLink + "/blob/master/index.html";
  var cssFile = githubLink + "/blob/master/style.css";
  var jsFile = githubLink + "/blob/master/script.js";

  validateHTML(htmlFile);
  validateCSS(cssFile);
  validateJS(jsFile);
}

function validateHTML(file) {
  // Perform HTML validation logic here
  // You can use external libraries like HTML Validator or built-in browser APIs
  // Example validation result
  var isValid = true;
  var htmlResult = document.createElement("div");
  htmlResult.className = isValid ? "success" : "error";
  htmlResult.textContent = "HTML Validation: " + (isValid ? "Passed" : "Failed");
  document.getElementById("results").appendChild(htmlResult);
}

function validateCSS(file) {
  // Perform CSS validation logic here
  // You can use external libraries like CSS Validator or built-in browser APIs
  // Example validation result
  var isValid = true;
  var cssResult = document.createElement("div");
  cssResult.className = isValid ? "success" : "error";
  cssResult.textContent = "CSS Validation: " + (isValid ? "Passed" : "Failed");
  document.getElementById("results").appendChild(cssResult);
}

function validateJS(file) {
  // Perform JavaScript validation logic here
  // You can use external libraries like ESLint or built-in browser APIs
  // Example validation result
  var isValid = true;
  var jsResult = document.createElement("div");
  jsResult.className = isValid ? "success" : "error";
  jsResult.textContent = "JavaScript Validation: " + (isValid ? "Passed" : "Failed");
  document.getElementById("results").appendChild(jsResult);
}