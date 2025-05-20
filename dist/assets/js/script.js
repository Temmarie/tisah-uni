document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll behavior
  const navbarScroll = document.getElementById("navbar-scroll");
  if (navbarScroll) {
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbarScroll.classList.add("opacity-0", "-translate-y-full");
        navbarScroll.classList.remove("opacity-100", "translate-y-0");
      } else {
        navbarScroll.classList.remove("opacity-0", "-translate-y-full");
        navbarScroll.classList.add("opacity-100", "translate-y-0");
      }
      lastScrollTop = Math.max(currentScroll, 0);
    });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close mobile menu on link click
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Testimonial Carousel
  const testimonials = document.querySelectorAll(
    "#testimonial-carousel .testimonial"
  );
  const dots = document.querySelectorAll("#testimonial-dots .dot");
  let current = 0;

  function showTestimonial(idx) {
    testimonials.forEach((el, i) => {
      el.classList.toggle("active", i === idx);
      dots[i].classList.toggle("active", i === idx);
    });
    current = idx;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => showTestimonial(idx));
  });

  if (testimonials.length > 0) {
    setInterval(
      () => showTestimonial((current + 1) % testimonials.length),
      7000
    );
    showTestimonial(0);
  }

  // Update copyright year
  const yearElem = document.getElementById("current-year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  // Slideshow
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    const images = slideshow.children;
    let currentImage = 0;

    function showNextImage() {
      images[currentImage].style.opacity = 0;
      images[currentImage].style.transform = "scale(1)";
      currentImage = (currentImage + 1) % images.length;
      images[currentImage].style.opacity = 1;
      images[currentImage].style.transform = "scale(1)";
      setTimeout(() => {
        images[currentImage].style.transform = "scale(1.1)";
      }, 100);
    }

    setInterval(showNextImage, 5000);
    images[0].classList.add("active");
    images[0].style.opacity = 1;
    images[0].style.transform = "scale(1.1)";
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.classList.add("animate-fade-in");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Trigger once on load
});
