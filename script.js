const folderIcon = document.querySelector(".folder-icon"); // 하이픈 사용
const introContainer = document.querySelector(".intro-container");
const portfolioContainer = document.querySelector(".portfolio-container");
const backButton = document.querySelector(".back-button");

folderIcon.addEventListener("click", () => {
  introContainer.classList.add("hidden");

  setTimeout(() => {
    portfolioContainer.classList.add("show");
    setTimeout(() => {
      backButton.classList.add("show");
    }, 500);
  }, 400);
});

backButton.addEventListener("click", () => {
  backButton.classList.remove("show");
  portfolioContainer.classList.remove("show");

  setTimeout(() => {
    introContainer.classList.remove("hidden");
    document.getElementById("menu-toggle").checked = true;
  }, 800);
});

folderIcon.addEventListener("mouseenter", () => {
  folderIcon.style.transform = "translateY(-10px) scale(1.1) rotateY(15deg)";
});

folderIcon.addEventListener("mouseleave", () => {
  folderIcon.style.transform = "translateY(0) scale(1) rotateY(0deg)";
});
// 스크롤 애니메이션 JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".growth-story, .learning-roadmap, .tech-interests, .contact-info"
  );

  animateElements.forEach((element) => {
    observer.observe(element);
  });
});
