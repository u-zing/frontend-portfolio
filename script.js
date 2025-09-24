// ========== 기존 코드 완전 유지 ==========
const folderIcon = document.querySelector(".folder-icon");
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

  // 모달 시스템 초기화
  initializeModalSystem();
});

// ========== 모달 관리 시스템 ==========

// 모달 시스템 초기화
function initializeModalSystem() {
  // 모든 모달이 처음에는 숨겨져 있는지 확인
  const allModals = document.querySelectorAll(".project-modal");
  const overlay = document.querySelector(".modal-overlay");

  allModals.forEach((modal) => {
    modal.classList.remove("active");
  });

  if (overlay) {
    overlay.classList.remove("active");
  }

  console.log("프로젝트 모달 시스템 초기화 완료");
}

// 모달 열기 함수
function openProjectModal(projectId) {
  const modal = document.getElementById(`${projectId}-modal`);
  const overlay = document.querySelector(".modal-overlay");

  if (modal && overlay) {
    // 다른 모든 모달 닫기
    document.querySelectorAll(".project-modal").forEach((m) => {
      if (m !== modal) {
        m.classList.remove("active");
      }
    });

    // 오버레이와 선택된 모달 표시
    overlay.classList.add("active");
    modal.classList.add("active");

    // body 스크롤 막기
    document.body.style.overflow = "hidden";

    // ESC 키로 닫기 이벤트 추가
    document.addEventListener("keydown", handleEscKey);

    // 모달이 열렸음을 로그
    console.log(`${projectId} 모달이 열렸습니다`);

    // 이미지 로딩 체크 (옵션)
    checkImageLoading(modal);
  }
}

// 특정 모달 닫기 함수
function closeModal(projectId) {
  const modal = document.getElementById(`${projectId}-modal`);
  const overlay = document.querySelector(".modal-overlay");

  if (modal && overlay) {
    // 모달과 오버레이 숨기기
    modal.classList.remove("active");

    // 다른 활성화된 모달이 있는지 확인
    const hasActiveModal = document.querySelector(".project-modal.active");

    if (!hasActiveModal) {
      overlay.classList.remove("active");
      // body 스크롤 복원
      document.body.style.overflow = "auto";
      // ESC 키 이벤트 제거
      document.removeEventListener("keydown", handleEscKey);
    }

    console.log(`${projectId} 모달이 닫혔습니다`);
  }
}

// 모든 모달 닫기 함수
function closeAllModals() {
  const allModals = document.querySelectorAll(".project-modal");
  const overlay = document.querySelector(".modal-overlay");

  // 모든 모달 숨기기
  allModals.forEach((modal) => {
    modal.classList.remove("active");
  });

  // 오버레이 숨기기
  if (overlay) {
    overlay.classList.remove("active");
  }

  // body 스크롤 복원
  document.body.style.overflow = "auto";

  // ESC 키 이벤트 제거
  document.removeEventListener("keydown", handleEscKey);

  console.log("모든 모달이 닫혔습니다");
}

// ESC 키 처리 함수
function handleEscKey(event) {
  if (event.key === "Escape") {
    closeAllModals();
  }
}

// 이미지 로딩 상태 체크 함수
function checkImageLoading(modal) {
  const images = modal.querySelectorAll(".project-image img");

  images.forEach((img) => {
    if (img.src && img.src !== "") {
      if (img.complete) {
        img.style.opacity = "1";
      } else {
        img.style.opacity = "0";
        img.addEventListener("load", function () {
          this.style.transition = "opacity 0.3s ease";
          this.style.opacity = "1";
        });

        img.addEventListener("error", function () {
          console.warn(`이미지 로딩 실패: ${this.src}`);
          this.style.opacity = "0.5";
          // 이미지 로딩 실패 시 placeholder 표시
          const parent = this.parentElement;
          if (parent) {
            parent.classList.add("image-error");
          }
        });
      }
    }
  });
}

// 모달 외부 클릭 시 닫기 (오버레이 클릭)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal-overlay")) {
    closeAllModals();
  }
});

// 모달 내용 클릭 시 이벤트 버블링 방지
document.addEventListener("click", function (event) {
  if (event.target.closest(".modal-content")) {
    event.stopPropagation();
  }
});

// 포커스 트랩 (접근성을 위한 기능)
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  });
}

// 이미지 확대 기능 (옵션)
function addImageZoomFeature() {
  document.querySelectorAll(".project-image img").forEach((img) => {
    img.addEventListener("click", function (event) {
      event.stopPropagation();

      // 이미지 확대 모달 생성
      const zoomModal = document.createElement("div");
      zoomModal.className = "image-zoom-modal";
      zoomModal.innerHTML = `
        <div class="zoom-overlay" onclick="this.parentElement.remove()">
          <img src="${this.src}" alt="${this.alt}" class="zoomed-image">
          <button class="zoom-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
      `;

      document.body.appendChild(zoomModal);
      document.body.style.overflow = "hidden";

      // 확대 모달 스타일 (인라인으로 추가)
      zoomModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const zoomedImg = zoomModal.querySelector(".zoomed-image");
      zoomedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
      `;

      const closeBtn = zoomModal.querySelector(".zoom-close");
      closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
      `;
    });
  });
}

// 반응형 모달 크기 조정
function handleModalResize() {
  const modals = document.querySelectorAll(".modal-content");

  function adjustModalSize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    modals.forEach((modal) => {
      if (windowWidth <= 768) {
        modal.style.width = "95%";
        modal.style.maxHeight = "95vh";
      } else {
        modal.style.width = "95%";
        modal.style.maxHeight = "90vh";
      }
    });
  }

  window.addEventListener("resize", adjustModalSize);
  adjustModalSize(); // 초기 실행
}

// 고급 기능들 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 이미지 확대 기능 활성화 (선택사항)
  // addImageZoomFeature();

  // 반응형 모달 크기 조정
  handleModalResize();
});
