document.addEventListener("DOMContentLoaded", () => {
  const buyNowBtn = document.getElementById("buyNowBtn");

  buyNowBtn.addEventListener("click", () => {
    alert("Redirecting you to the book store...");
    window.location.href = "shop.html"; // Replace with your shop page link
  });
});
