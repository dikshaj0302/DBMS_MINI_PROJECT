// Subtle hover effect shadows for each step
document.querySelectorAll('.step').forEach(step => {
  step.addEventListener('mouseenter', () => {
    step.style.boxShadow = "0 6px 20px rgba(138,0,0,0.25)";
  });
  step.addEventListener('mouseleave', () => {
    step.style.boxShadow = "";
  });
});

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
