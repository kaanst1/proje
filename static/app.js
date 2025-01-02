const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem:not(.passItem)");
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const dropdownMenu = document.getElementById("dropdown-menu");
  let activeCategory = null;
const cartItems = [];
const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cart-popup");
const cartItemsContainer = document.querySelector(".cart-items");

document.querySelectorAll(".productButton").forEach((button) => {
    button.addEventListener("click", (event) => {
        
        const productId = button.getAttribute("data-product-id");
        const productName = button.getAttribute("data-product-name");
        const productPrice = button.getAttribute("data-product-price");
        const productImage = button.getAttribute("data-product-image");

       
        addToCart();
    });
});
function updateCartUI() {
  cartItemsContainer.innerHTML = ""; 

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

  
  cartPopup.classList.add("active");
}



function updateCartUI() {
    cartItemsContainer.innerHTML = ""; 

    
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

    
    cartPopup.classList.add("active");
}


cartIcon.addEventListener("click", () => {
    cartPopup.classList.toggle("active");
});


  
  hamburgerMenu.addEventListener("click", () => {
      if (dropdownMenu.style.display === "block") {
          dropdownMenu.style.display = "none";
      } else {
          dropdownMenu.style.display = "block";
      }
  });

  
  document.querySelectorAll(".dropdown-menu .category").forEach((category) => {
      category.addEventListener("click", () => {
          const categoryName = category.getAttribute("data-category");
          activeCategory = categoryName;
      });
  });

  
  document.addEventListener("click", (e) => {
      if (!hamburgerMenu.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = "none";
      }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartPopup = document.getElementById("cart-popup");
  const viewCartButton = document.getElementById("view-cart");

  
  cartIcon.addEventListener("click", () => {
      if (cartPopup.style.display === "block") {
          cartPopup.style.display = "none";
      } else {
          cartPopup.style.display = "block";
      }
  });

  
  viewCartButton.addEventListener("click", () => {
      window.location.href = "/cart"; 
  });

  
  document.addEventListener("click", (e) => {
      if (!cartIcon.contains(e.target) && !cartPopup.contains(e.target)) {
          cartPopup.style.display = "none";
      }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');
  const reviewText = document.getElementById('review-text');
  const submitReview = document.getElementById('submit-review');
  const reviewList = document.getElementById('review-list');
  let selectedRating = 0;

  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          selectedRating = index + 1;
          stars.forEach((s, i) => {
              s.classList.toggle('active', i < selectedRating);
          });
      });
  });

  submitReview.addEventListener('click', () => {
      const review = reviewText.value.trim();
      if (selectedRating === 0 || review === '') {
          alert('Lütfen değerlendirme ve yorumunuzu doldurun.');
          return;
      }

      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      reviewItem.innerHTML = `<strong>${selectedRating} yıldız</strong>: ${review}`;
      reviewList.appendChild(reviewItem);

      reviewText.value = '';
      stars.forEach(star => star.classList.remove('active'));
      selectedRating = 0;
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

function openCart(){
  let req = new XMLHttpRequest();
  req.onload = function(){
    let data = JSON.parse(this.responseText).cart;
    let cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
      let item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <img src="/img/products/${data[i].id}.png" alt="${data[i].name}" width="50" />
        <div>
          <h4>${data[i].name}</h4>
          <p>${data[i].price}</p>
        </div>
      `;
      cartItemsContainer.appendChild(item);
    }
  };

  req.open("POST", "/get_cart");
  req.send();
}

function addToCart(){
  let req = new XMLHttpRequest();
  req.onload = function(){
    openCart();
  };

  req.open("POST", "/add_to_cart/" + choosenProduct.id);
  req.send();
}