var openBuy = document.querySelectorAll(".btn-buy");
var modalBuy = document.querySelector(".modal-cart");
var closeBuy = modalBuy.querySelector(".modal-close-cart");
var overlay = document.querySelector(".overlay");

for (var i = 0; i < openBuy.length; i++) {
  openBuy[i].addEventListener("click", function(btn) {
    btn.preventDefault(),
    modalBuy.classList.add("modal-show");
    overlay.classList.add("overlay-show");
  });
  closeBuy.addEventListener("click", function(btn) {
      btn.preventDefault(),
      modalBuy.classList.remove("modal-show");
      overlay.classList.remove("overlay-show");
  });
  overlay.addEventListener("click", function(evt) {
    evt.preventDefault(),
    modalBuy.classList.remove("modal-show");
    overlay.classList.remove("overlay-show");
  });
}