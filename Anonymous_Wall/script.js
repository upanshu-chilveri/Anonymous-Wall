// Scroll to Top
window.onscroll = function () {
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
