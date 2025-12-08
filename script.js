
// lazy loading of the products cards

function lazyLoad() {
  const images = document.querySelectorAll("img.lazy");

  for (let img of images) {

    if (!img.style.height) {
      img.style.height = "300px";
    }

    if (img.offsetTop < (window.innerHeight + window.pageYOffset)) {

      if (img.dataset.src) {
        img.src = img.dataset.src;
      }

      if (img.dataset.alt) {
        img.alt = img.dataset.alt;
      }

      img.classList.remove("lazy");
      img.addEventListener("load", function () {
        img.style.height = "auto";
        img.classList.add("loaded");
      }, { once: true });
    }
  }
}

window.addEventListener("load", lazyLoad);
window.addEventListener("scroll", lazyLoad);
window.addEventListener("resize", lazyLoad);