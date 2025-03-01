document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript Loaded without blocking rendering.");

  // 1. Lazy Load Images
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

  // 2. Lightweight Image Slider (using display: block/none)
  const slides = document.querySelectorAll(".slider img");
  let currentIndex = 0;

  // Show only the slide at 'index'; hide all others
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "block" : "none";
    });
  }

  // Cycle to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Initially show the first slide
  showSlide(currentIndex);

  // Attach event listener to the next button (if found in .slider, else fallback)
  const nextButton = document.querySelector(".slider button");
  if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
  } else {
    const fallbackButton = document.querySelector("button");
    if (fallbackButton) {
      fallbackButton.addEventListener("click", nextSlide);
    }
  }

  // 3. Automatically resize slider on window resize (optional)
  window.addEventListener("resize", function() {
    let slider = document.querySelector(".slider");
    let screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      slider.style.height = "300px"; // Mobile height
    } else {
      slider.style.height = "500px"; // Desktop height
    }
  });

  // 4. Job Application Form Validation
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

  // 5. Hamburger Menu for Mobile Navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    menuToggle.addEventListener('touchstart', function() {
      navMenu.classList.toggle('active');
    });
  }

  // 6. Footer loaded message
  console.log("Footer Loaded Successfully");
});
