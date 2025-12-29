

// lazy loading of the products cards (same reference-style lazy loader)
function lazyLoad() {
  const images = document.querySelectorAll("img.lazy");

  for (let img of images) {
    if (!img.style.height) {
      img.style.height = "300px";
    }

    if (img.offsetTop < window.innerHeight + window.pageYOffset) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }

      if (img.dataset.alt) {
        img.alt = img.dataset.alt;
      }

      img.classList.remove("lazy");
      img.addEventListener(
        "load",
        function () {
          img.style.height = "auto";
          img.classList.add("loaded");
        },
        { once: true }
      );
    }
  }
}

window.addEventListener("load", lazyLoad);
window.addEventListener("scroll", lazyLoad, { passive: true });
window.addEventListener("resize", lazyLoad);

// #########################################
//                form validation
// #########################################                
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".quote-form");
  if (!form) return;

  const nameRe = /^[a-zA-Z ]{3,}$/;
  const emailRe = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
  const phoneRe = /^03\d{2}-?\d{7}$/;

  form.addEventListener("submit", function (e) {
    let isValid = true;

    const fullname = document.querySelector("#fullname");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const projectType = document.querySelector("#project-type");
    const material = document.querySelector("#material");
    const budget = document.querySelector("#budget");
    const timeline = document.querySelector("#timeline");

    // Full Name
    if (!fullname.value.trim() || !nameRe.test(fullname.value.trim())) {
      fullname.style.background = "#ffdddd";
      isValid = false;
    } else {
      fullname.style.background = "";
    }

    // Email
    if (!email.value.trim() || !emailRe.test(email.value.trim())) {
      email.style.background = "#ffdddd";
      isValid = false;
    } else {
      email.style.background = "";
    }

    // Phone
    if (!phone.value.trim() || !phoneRe.test(phone.value.trim())) {
      phone.style.background = "#ffdddd";
      isValid = false;
    } else {
      phone.style.background = "";
    }

    // Project Type
    if (!projectType.value) {
      projectType.style.background = "#ffdddd";
      isValid = false;
    } else {
      projectType.style.background = "";
    }

    // Material
    if (!material.value) {
      material.style.background = "#ffdddd";
      isValid = false;
    } else {
      material.style.background = "";
    }

    // Budget
    if (!budget.value) {
      budget.style.background = "#ffdddd";
      isValid = false;
    } else {
      budget.style.background = "";
    }

    // Timeline
    if (!timeline.value) {
      timeline.style.background = "#ffdddd";
      isValid = false;
    } else {
      timeline.style.background = "";
    }

    if (!isValid) {
      e.preventDefault();
      alert("Please fix the highlighted required fields before submitting.");
    }
  });

  const requiredFields = form.querySelectorAll(
    "#fullname, #email, #phone, #project-type, #material, #budget, #timeline"
  );
  requiredFields.forEach((el) => {
    const evt = el.tagName.toLowerCase() === "select" ? "change" : "input";
    el.addEventListener(evt, () => {
      if (el.style.background) el.style.background = "";
    });
  });
});



const API_URL = "/api/products";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productContainer");
  if (!container) return;

  fetch(API_URL)
    .then(res => res.json())
    .then(products => {
      container.innerHTML = products.map(p => `
        <article class="product-card">
          <div class="card-media">
            <div class="tag">${p.category}</div>
            <img src="${p.image}" alt="${p.name}">
          </div>

          <div class="card-body">
            <h3>${p.name}</h3>
            <p>${p.description}</p>

            <div class="features">
              ${p.features.map(f => `<span>${f}</span>`).join("")}
            </div>

            <div class="detail-price">
              <button class="view-btn">View Detail</button>
              <p class="price">From Rs. ${p.price}/sq ft</p>
            </div>
          </div>
        </article>
      `).join("");
    })
    .catch(err => {
      container.innerHTML = "<p>Failed to load products</p>";
      console.error(err);
    });
});

