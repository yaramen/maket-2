const mobilePanel = document.querySelector(".mobile-panel");
const hamburger = document.querySelector(".header__hamburger");
const close = document.querySelector(".mobile-panel__close");

hamburger.addEventListener("click", () => {
  mobilePanel.classList.toggle("-open");
});

close.addEventListener("click", () => {
  mobilePanel.classList.toggle("-open")
});
