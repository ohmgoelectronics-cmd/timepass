/* =====================================================
   OHMGO PRODUCT SYSTEM — OPTION C (GITHUB IMAGES + MANUAL URL)
   Works on GitHub Pages — No blob URLs, no file uploads.
   Products saved in localStorage
===================================================== */

// Your GitHub image folder URL (RAW links)
const GITHUB_IMAGE_BASE =
  "https://raw.githubusercontent.com/ohmgoelectronics-cmd/ohmgo/main/images/";

// Default image if nothing is set
const DEFAULT_IMAGE = GITHUB_IMAGE_BASE + "no-image.png";

// Load products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

/* --------------------------
   SAVE PRODUCTS TO STORAGE
--------------------------- */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* --------------------------
   ADD NEW PRODUCT
--------------------------- */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const stock = document.getElementById("stock").value.trim();
  const description = document.getElementById("description").value.trim();
  const code = document.getElementById("code").value.trim();
  const manualURL = document.getElementById("imageURL").value.trim();

  if (!name || !price) {
    alert("Name and price are required.");
    return;
  }

  // Use manual URL OR GitHub auto-file
  const image = manualURL
    ? manualURL
    : GITHUB_IMAGE_BASE + name.replace(/ /g, "_") + ".jpg";

  const newProduct = {
    id: Date.now(),
    name,
    price,
    stock,
    description,
    code,
    image,
  };

  products.push(newProduct);
  saveProducts();
  renderProducts();
  clearForm();
}

/* --------------------------
   DELETE PRODUCT
--------------------------- */
function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  saveProducts();
  renderProducts();
}

/* --------------------------
   CLEAR FORM
--------------------------- */
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("description").value = "";
  document.getElementById("code").value = "";
  document.getElementById("imageURL").value = "";
}

/* --------------------------
   RENDER PRODUCT LIST
--------------------------- */
function renderProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" onerror="this.src='${DEFAULT_IMAGE}'">
      <h3>${p.name}</h3>
      <p class="price">₱${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <p><strong>Code:</strong> ${p.code}</p>
      <p>${p.description}</p>

      <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
    `;

    container.appendChild(card);
  });
}

/* --------------------------
   INITIAL RENDER
--------------------------- */
renderProducts();
