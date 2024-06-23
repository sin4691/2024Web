document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    includeHTML();
  });
  
  function includeHTML() {
    var elements = document.querySelectorAll('[include-html]');
    console.log("Elements to include HTML:", elements);
    elements.forEach(function(elmnt) {
      var file = elmnt.getAttribute("include-html");
      console.log("Loading file:", file);
      if (file) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              console.log("File loaded successfully:", file);
              elmnt.innerHTML = this.responseText;
            }
            if (this.status === 404) {
              console.log("File not found:", file);
              elmnt.innerHTML = "Page not found.";
            }
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
      }
    });
  }
  