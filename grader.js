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
  var reader = new FileReader();
  reader.onload = function (event) {
    var htmlString = event.target.result;
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlString, "text/html");
    var isValid = doc.documentElement.validity.valid;

    var htmlResult = document.createElement("div");
    htmlResult.className = isValid ? "success" : "error";
    htmlResult.textContent = "HTML Validation: " + (isValid ? "Passed" : "Failed");
    document.getElementById("results").appendChild(htmlResult);
  };
  reader.readAsText(file);
}

function validateCSS(file) {
  // Perform CSS validation logic here using the W3C CSS Validation API

  var url = "https://validator.w3.org/nu/?doc=" + encodeURIComponent(file);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var isValid = data.validity.valid;
      var cssResult = document.createElement("div");
      cssResult.className = isValid ? "success" : "error";
      cssResult.textContent = "CSS Validation: " + (isValid ? "Passed" : "Failed");
      document.getElementById("results").appendChild(cssResult);
    })
    .catch(error => {
      console.error("Error occurred during CSS validation:", error);
    });
}


function validateJS(file) {
  // Perform JavaScript validation logic here

  // Example validation result
  var isValid = true;
  var jsResult = document.createElement("div");
  jsResult.className = isValid ? "success" : "error";
  jsResult.textContent = "JavaScript Validation: " + (isValid ? "Passed" : "Failed");
  document.getElementById("results").appendChild(jsResult);

  // Make a request to the validation API
  fetch('https://api.example.com/validate', {
    method: 'POST',
    body: JSON.stringify({ file: file }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Process the validation API response
      if (data.isValid) {
        jsResult.className = "success";
        jsResult.textContent = "JavaScript Validation: Passed";
      } else {
        jsResult.className = "error";
        jsResult.textContent = "JavaScript Validation: Failed";
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
