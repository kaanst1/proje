const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem:not(.passItem)");
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const subcategories = document.getElementById("subcategories");
  let activeCategory = null;
  // Sepet Verileri
const cartItems = [];
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.querySelector(".cart-items");

// "SEPETE EKLE" Butonlarına Tıklama
document.querySelectorAll(".productButton").forEach((button) => {
    button.addEventListener("click", (event) => {
        // Ürün Verilerini Al
        const productId = button.getAttribute("data-product-id");
        const productName = button.getAttribute("data-product-name");
        const productPrice = button.getAttribute("data-product-price");
        const productImage = button.getAttribute("data-product-image");

        // Sepete Ürün Ekle
        cartItems.push({ id: productId, name: productName, price: productPrice, image: productImage });
        updateCartUI();
    });
});
function updateCartUI() {
  cartItemsContainer.innerHTML = ""; // Eski içeriği temizle

  cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="50" />
          <div>
              <h4>${item.name}</h4>
              <p>${item.price}</p>
          </div>
      `;
      cartItemsContainer.appendChild(itemElement);
  });

  // Sepet popup'ını görünür yap
  cartPopup.classList.add("active");
}


// Sepet UI Güncelleme
function updateCartUI() {
    cartItemsContainer.innerHTML = ""; // Eski içeriği temizle

    // Her bir ürün için yeni içerik oluştur
    cartItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" />
            <div>
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Sepet popup'ını görünür yap
    cartPopup.classList.add("active");
}

// Sepet İkonuna Tıklama
cartIcon.addEventListener("click", () => {
    cartPopup.classList.toggle("active");
});


  // Hamburger menüsüne tıklayınca açılır listeyi göster veya gizle
  hamburgerMenu.addEventListener("click", () => {
      if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
          subcategories.style.display = "none"; // Alt kategorileri de gizle
      } else {
          dropdownMenu.style.display = "block";
          subcategories.style.display = "none"; // Alt kategoriler kapalı başlasın
      }
  });

  // Kategoriye tıklanınca ilgili alt kategorileri göster
  document.querySelectorAll(".dropdown-menu .category").forEach((category) => {
      category.addEventListener("click", () => {
          const categoryName = category.getAttribute("data-category");
          activeCategory = categoryName;

          // İlgili alt kategorileri göster, diğerlerini gizle
          subcategories.style.display = "block";
          document.querySelectorAll(".subcategories .subcategory").forEach((subcategory) => {
              if (subcategory.getAttribute("data-parent") === categoryName) {
                  subcategory.style.display = "block";
              } else {
                  subcategory.style.display = "none";
              }
          });
      });
  });

  // Menülerin dışında bir yere tıklanınca menüyü gizle
  document.addEventListener("click", (e) => {
      if (!hamburgerMenu.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = "none";
          subcategories.style.display = "none";
      }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartPopup = document.getElementById("cart-popup");
  const viewCartButton = document.getElementById("view-cart");

  // Sepet ikonuna tıklanınca popup'ı göster/gizle
  cartIcon.addEventListener("click", () => {
      if (cartPopup.style.display === "block") {
          cartPopup.style.display = "none";
      } else {
          cartPopup.style.display = "block";
      }
  });

  // Sepet detaylarına yönlendirme
  viewCartButton.addEventListener("click", () => {
      window.location.href = "shopping-cart.html"; // Sepet sayfasına yönlendirme
  });

  // Sayfanın başka bir yerine tıklanınca popup'ı kapat
  document.addEventListener("click", (e) => {
      if (!cartIcon.contains(e.target) && !cartPopup.contains(e.target)) {
          cartPopup.style.display = "none";
      }
  });
});


const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "img/air.png",
      },
      {
        code: "darkblue",
        img: "img/air2.png",
      },
    ],
  },
  
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "img/jordan.png",
      },
      {
        code: "green",
        img: "img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "img/blazer.png",
      },
      {
        code: "green",
        img: "img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "img/crater.png",
      },
      {
        code: "lightgray",
        img: "img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "img/hippie.png",
      },
      {
        code: "black",
        img: "img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    
    choosenProduct = products[index];

    
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;
    let btn = document.getElementById('addToCart');
    btn.setAttribute('data-product-id', choosenProduct.id.toString());
    btn.setAttribute('data-product-name', choosenProduct.title);
    btn.setAttribute('data-product-price', choosenProduct.price.toFixed(2));
    btn.setAttribute('data-product-image', choosenProduct.colors[0].img);
    
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
