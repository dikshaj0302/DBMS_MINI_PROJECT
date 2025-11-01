document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  document.getElementById("startSellingBtn").addEventListener("click", () => {
    alert("Redirecting to book listing form...");
    // You can replace this with actual page redirect:
    // window.location.href = "sell-form.html";
  });
});
