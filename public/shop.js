document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    
    includeHTML().then(() => {
        console.log("HTML includes loaded.");
        loadProducts();
        setupCategoryFilter();
    }).catch(error => {
        console.error("Error including HTML:", error);
    });
});



function includeHTML() {
    var elements = document.querySelectorAll('[include-html]');
    console.log("Elements to include HTML:", elements);
    var promises = Array.from(elements).map(elmnt => {
        return new Promise((resolve, reject) => {
            var file = elmnt.getAttribute("include-html");
            console.log("Loading file:", file);
            if (file) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            console.log("File loaded successfully:", file);
                            elmnt.innerHTML = this.responseText;
                            elmnt.removeAttribute("include-html");
                            resolve();
                        } else if (this.status === 404) {
                            console.log("File not found:", file);
                            elmnt.innerHTML = "Page not found.";
                            elmnt.removeAttribute("include-html");
                            resolve();
                        } else {
                            reject(new Error(`Failed to load file: ${file}`));
                        }
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
            } else {
                resolve();
            }
        });
    });

    return Promise.all(promises);
}



function loadProducts() {
    var productsContainer = document.getElementById("productsContainer");
    if (productsContainer) {
        var xhttpProducts = new XMLHttpRequest();
        xhttpProducts.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                productsContainer.innerHTML = this.responseText;
                setupCategoryFilter(); // Setup filter after products are loaded
            }
        };
        xhttpProducts.open("GET", "/products", true);
        xhttpProducts.send();
    } else {
        console.error("productsContainer element not found.");
    }
}

function filterProducts(category) {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function setupCategoryFilter() {
    const categoryList = document.getElementById("category-list");
    if (categoryList) {
        categoryList.addEventListener("click", function(event) {
            const category = event.target.dataset.category;
            filterProducts(category);
        });
    } else {
        console.error("category-list element not found.");
    }
}



