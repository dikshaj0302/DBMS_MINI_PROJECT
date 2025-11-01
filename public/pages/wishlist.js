
// DOM references
const wishlistContainer = document.querySelector(".empty-wishlist");
const wishlistText = wishlistContainer.querySelector("p");

// Simulated wishlist items array
let wishlistItems = [];

// Function to render wishlist status
function renderWishlist() {
  if (wishlistItems.length === 0) {
    wishlistContainer.style.display = "flex";
    wishlistText.textContent = "Sorry you have an empty wishlist :(";
  } else {
    wishlistContainer.style.display = "none";
    alert(`You have ${wishlistItems.length} item(s) in your wishlist!`);
    // You can replace this with actual rendering code
  }
}

// Example: Add a wishlist item
function addToWishlist(item) {
  wishlistItems.push(item);
  renderWishlist();
}

// Example: Clear the wishlist
function clearWishlist() {
  wishlistItems = [];
  renderWishlist();
}

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();

  // Simulate adding after 3 seconds
  setTimeout(() => {
    addToWishlist("Cool Red Shirt");
  }, 3000);

  // Simulate clearing after 6 seconds
  setTimeout(() => {
    clearWishlist();
  }, 6000);
});
