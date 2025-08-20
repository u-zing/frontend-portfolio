const folderIcon = document.querySelector(".folder-icon"); // 하이픈 사용
const introContainer = document.querySelector(".intro-container");
const portfolioContainer = document.querySelector(".portfolio-container");
const backButton = document.querySelector(".back-button");

// 나머지 코드는 동일
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
