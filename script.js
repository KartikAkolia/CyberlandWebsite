document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript Loaded without blocking rendering.");

  // Lazy Load Images
  const lazyImages = document.querySelectorAll("img.lazy-load");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy-load");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // Lightweight Image Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  window.nextSlide = function () {
    if (slides.length > 0) {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }
  };

  // Job Application Form Validation
  const jobForm = document.getElementById("jobForm");
  if (jobForm) {
    jobForm.addEventListener("submit", function (event) {
      const fileInput = document.getElementById("cv");
      const file = fileInput.files[0];
      if (file && file.size > 2 * 1024 * 1024) { // Limit: 2MB
        alert("File size must be under 2MB");
        event.preventDefault();
      }
    });
  }

  // Footer loaded message
  console.log("Footer Loaded Successfully");
});
