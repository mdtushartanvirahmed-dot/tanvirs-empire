/* =========================================================
   TANVIR'S EMPIRE
   Premium Restaurant Website - Main JavaScript
========================================================= */


/* ================= MENU DATABASE ================= */

const menuItems = [
    {
        id: 1,
        name: "Empire Monster Burger",
        category: "burgers",
        price: 380,
        badge: "Chef Special",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700"
    },
    {
        id: 2,
        name: "Double Cheese Blast",
        category: "burgers",
        price: 290,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700"
    },
    {
        id: 3,
        name: "Smoky BBQ Chicken Burger",
        category: "burgers",
        price: 260,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700"
    },

    {
        id: 4,
        name: "Supreme BBQ Pizza (12\")",
        category: "pizza",
        price: 750,
        badge: "Top Rated",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700"
    },
    {
        id: 5,
        name: "Pepperoni Overload (12\")",
        category: "pizza",
        price: 820,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700"
    },
    {
        id: 6,
        name: "Cheese Lovers Delight",
        category: "pizza",
        price: 680,
        badge: "New",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700"
    },

    {
        id: 7,
        name: "Crispy Fried Chicken (4 pcs)",
        category: "chicken",
        price: 350,
        badge: "Hot & Spicy",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=700"
    },
    {
        id: 8,
        name: "Spicy Wings Basket (8 pcs)",
        category: "chicken",
        price: 280,
        badge: "Crispy",
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=700"
    },

    {
        id: 9,
        name: "Loaded Cheese Fries",
        category: "drinks",
        price: 180,
        badge: "Must Try",
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=700"
    },
    {
        id: 10,
        name: "Oreo Monster Shake",
        category: "drinks",
        price: 220,
        badge: "Cold & Sweet",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700"
    },
    {
        id: 11,
        name: "Chocolate Hazelnut Shake",
        category: "drinks",
        price: 200,
        badge: "Rich Flavor",
        image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=700"
    },
    {
        id: 12,
        name: "Chilled Cold Coffee",
        category: "drinks",
        price: 150,
        badge: "Refreshing",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700"
    }
];


/* ================= GLOBAL VARIABLES ================= */

let cart = [];
let discount = 0;
let currentCategory = "all";

const WHATSAPP_NUMBER = "8801700000000";
// ↑ এখানে তোমার restaurant-এর WhatsApp number বসাবে.
// Example: Bangladesh number 017xxxxxxxx
// লিখবে: 88017xxxxxxxx


/* ================= HTML ESCAPE ================= */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================= LOCAL STORAGE ================= */

function saveCart() {
    try {
        localStorage.setItem("tanvirEmpireCart", JSON.stringify(cart));
    } catch (error) {
        console.log("Cart storage unavailable.");
    }
}


function loadSavedCart() {
    try {
        const saved = localStorage.getItem("tanvirEmpireCart");

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                cart = parsed;
            }
        }
    } catch (error) {
        cart = [];
    }
}


/* ================= LOAD MENU ================= */

function loadMenu(items = menuItems) {

    const container = document.getElementById("menu-container");

    if (!container) return;

    container.innerHTML = "";

    if (!items.length) {

        container.innerHTML = `
            <div class="no-results" style="
                grid-column:1/-1;
                text-align:center;
                padding:50px 20px;
                color:#999;
            ">
                <i class="fas fa-search" style="font-size:35px;margin-bottom:15px;"></i>
                <h3>No food found</h3>
                <p>আপনার সার্চ অনুযায়ী কোনো খাবার পাওয়া যায়নি।</p>
            </div>
        `;

        return;
    }


    items.forEach(item => {

        container.innerHTML += `

            <div class="menu-card" data-category="${item.category}">

                <div class="menu-image">

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                    >

                    <span class="item-badge">
                        ${escapeHTML(item.badge)}
                    </span>

                    <button
                        class="quick-add"
                        onclick="addToCart(${item.id})"
                        aria-label="Add ${escapeHTML(item.name)} to cart"
                    >
                        <i class="fas fa-plus"></i>
                    </button>

                </div>


                <div class="menu-info">

                    <span class="menu-category">
                        ${formatCategory(item.category)}
                    </span>

                    <h3>${escapeHTML(item.name)}</h3>


                    <div class="menu-card-bottom">

                        <div class="price">
                            ৳${item.price}
                        </div>

                        <button
                            class="add-cart-btn btn btn-primary"
                            onclick="addToCart(${item.id})"
                        >
                            <i class="fas fa-cart-plus"></i>
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}


/* ================= CATEGORY NAME ================= */

function formatCategory(category) {

    const categories = {
        burgers: "Burgers",
        pizza: "Pizza",
        chicken: "Fried Chicken",
        drinks: "Drinks & Shakes"
    };

    return categories[category] || "Food";
}


/* ================= FILTER MENU ================= */

function filterMenu(category, event) {

    currentCategory = category;

    document.querySelectorAll(".cat-btn").forEach(button => {
        button.classList.remove("active");
    });


    if (event) {

        const clickedButton =
            event.currentTarget ||
            event.target;

        if (clickedButton) {
            clickedButton.classList.add("active");
        }

    } else {

        const matchingButton =
            document.querySelector(
                `.cat-btn[data-category="${category}"]`
            );

        if (matchingButton) {
            matchingButton.classList.add("active");
        }

    }


    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    let filtered = menuItems;


    if (category !== "all") {
        filtered = filtered.filter(
            item => item.category === category
        );
    }


    if (searchText) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchText)
        );
    }


    loadMenu(filtered);
}


/* ================= SEARCH MENU ================= */

function searchMenu() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const query =
        input.value.toLowerCase().trim();


    let filtered = menuItems;


    if (currentCategory !== "all") {

        filtered = filtered.filter(
            item => item.category === currentCategory
        );

    }


    if (query) {

        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.badge.toLowerCase().includes(query)
        );

    }


    loadMenu(filtered);
}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        menuItems.find(item => item.id === id);


    if (!product) return;


    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.qty += 1;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }


    saveCart();

    updateCartUI();

    showToast(
        `${product.name} কার্টে যোগ করা হয়েছে!`
    );


    // Small button animation

    const buttons =
        document.querySelectorAll(
            `.quick-add, .add-cart-btn`
        );

    buttons.forEach(button => {

        if (
            button.getAttribute("onclick") ===
            `addToCart(${id})`
        ) {

            button.classList.add("added");

            setTimeout(() => {
                button.classList.remove("added");
            }, 400);

        }

    });
}


/* ================= UPDATE CART ================= */

function updateCartUI() {

    const cartContainer =
        document.getElementById("cart-items");

    const countElement =
        document.getElementById("cart-count");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const discountElement =
        document.getElementById("cart-discount");

    const totalElement =
        document.getElementById("cart-total");


    let subtotal = 0;
    let totalQuantity = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.qty);

        totalQuantity +=
            Number(item.qty);

    });


    const discountAmount =
        subtotal * discount;


    const finalTotal =
        subtotal - discountAmount;


    if (countElement) {
        countElement.innerText = totalQuantity;
    }


    if (subtotalElement) {
        subtotalElement.innerText =
            subtotal.toFixed(0);
    }


    if (discountElement) {
        discountElement.innerText =
            discountAmount.toFixed(0);
    }


    if (totalElement) {
        totalElement.innerText =
            finalTotal.toFixed(0);
    }


    if (!cartContainer) return;


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fas fa-shopping-bag"></i>

                <p class="empty-cart-text">
                    আপনার কার্ট বর্তমানে খালি।
                </p>

                <small>
                    Menu থেকে আপনার পছন্দের খাবার যোগ করুন।
                </small>

            </div>

        `;

        return;
    }


    cartContainer.innerHTML = "";


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.qty);


        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                    >

                </div>


                <div class="cart-item-info">

                    <h4>
                        ${escapeHTML(item.name)}
                    </h4>

                    <span>
                        ৳${item.price} each
                    </span>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <strong>
                            ${item.qty}
                        </strong>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <div class="cart-item-right">

                    <strong>
                        ৳${itemTotal}
                    </strong>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                        aria-label="Remove item"
                    >
                        <i class="fas fa-trash"></i>
                    </button>

                </div>

            </div>

        `;
    });


    saveCart();
}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    item.qty += amount;


    if (item.qty <= 0) {

        cart =
            cart.filter(product => product.id !== id);

        showToast("আইটেমটি কার্ট থেকে সরানো হয়েছে।");

    }


    saveCart();

    updateCartUI();
}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(id) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    cart =
        cart.filter(product => product.id !== id);


    saveCart();

    updateCartUI();

    showToast(
        `${item.name} কার্ট থেকে সরানো হয়েছে।`
    );
}


/* ================= COUPON ================= */

function applyCoupon() {

    const input =
        document.getElementById("couponCode");


    if (!input) return;


    const code =
        input.value.trim().toUpperCase();


    if (!code) {

        showToast("আগে একটি coupon code লিখুন।");

        return;
    }


    if (code === "EMPIRE25") {

        discount = 0.25;

        input.value = "EMPIRE25";

        updateCartUI();

        showToast(
            "🎉 ২৫% ডিসকাউন্ট সফলভাবে যোগ হয়েছে!"
        );

    } else {

        discount = 0;

        updateCartUI();

        showToast(
            "❌ Invalid coupon code!"
        );

    }
}


/* ================= TOGGLE CART ================= */

function toggleCart() {

    const cartModal =
        document.getElementById("cart-modal");


    if (!cartModal) return;


    cartModal.classList.toggle("open");


    document.body.classList.toggle(
        "cart-open",
        cartModal.classList.contains("open")
    );


    // Create backdrop if needed

    let backdrop =
        document.querySelector(".cart-backdrop");


    if (!backdrop) {

        backdrop =
            document.createElement("div");

        backdrop.className =
            "cart-backdrop";

        document.body.appendChild(backdrop);


        backdrop.addEventListener(
            "click",
            toggleCart
        );

    }


    backdrop.classList.toggle(
        "show",
        cartModal.classList.contains("open")
    );
}


/* ================= CLOSE CART ================= */

function closeCart() {

    const cartModal =
        document.getElementById("cart-modal");


    if (!cartModal) return;


    cartModal.classList.remove("open");

    document.body.classList.remove("cart-open");


    const backdrop =
        document.querySelector(".cart-backdrop");


    if (backdrop) {
        backdrop.classList.remove("show");
    }
}


/* ================= WHATSAPP ORDER ================= */

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        showToast(
            "আপনার cart খালি!"
        );

        return;
    }


    let subtotal = 0;


    let message =
        "🔥 TANVIR'S EMPIRE - NEW ORDER\n\n";


    message +=
        "🍔 Order Items:\n";


    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.qty);


        subtotal += itemTotal;


        message +=
            `• ${item.name} x${item.qty} = ৳${itemTotal}\n`;

    });


    const discountAmount =
        subtotal * discount;


    const finalTotal =
        subtotal - discountAmount;


    message +=
        `\nSubtotal: ৳${subtotal.toFixed(0)}`;


    if (discountAmount > 0) {

        message +=
            `\nDiscount: -৳${discountAmount.toFixed(0)}`;

    }


    message +=
        `\nTotal: ৳${finalTotal.toFixed(0)}`;


    message +=
        "\n\nPlease confirm my order.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast(
            "আপনার cart খালি!"
        );

        return;
    }


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.qty);

    });


    const finalTotal =
        subtotal -
        (subtotal * discount);


    alert(
        `ধন্যবাদ! আপনার Cash on Delivery order নেওয়া হয়েছে।\n\nTotal: ৳${finalTotal.toFixed(0)}\n\nTanvir's Empire আপনার order খুব শীঘ্রই confirm করবে।`
    );


    cart = [];

    discount = 0;


    const coupon =
        document.getElementById("couponCode");


    if (coupon) {
        coupon.value = "";
    }


    saveCart();

    updateCartUI();

    closeCart();
}


/* ================= TABLE BOOKING ================= */

function handleBooking(event) {

    event.preventDefault();


    const form =
        event.target;


    const inputs =
        form.querySelectorAll(
            "input, select, textarea"
        );


    const name =
        inputs[0]?.value || "";


    const phone =
        inputs[1]?.value || "";


    if (!name || !phone) {

        showToast(
            "দয়া করে প্রয়োজনীয় তথ্য পূরণ করুন।"
        );

        return;
    }


    alert(
        `ধন্যবাদ ${name}!\n\nTanvir's Empire-এ আপনার table reservation request সফলভাবে নেওয়া হয়েছে।`
    );


    form.reset();
}


/* ================= REVIEWS ================= */

function addReview(event) {

    event.preventDefault();


    const nameElement =
        document.getElementById("revName");


    const ratingElement =
        document.getElementById("revRating");


    const commentElement =
        document.getElementById("revComment");


    const reviewContainer =
        document.getElementById("reviews-container");


    if (
        !nameElement ||
        !ratingElement ||
        !commentElement ||
        !reviewContainer
    ) {
        return;
    }


    const name =
        nameElement.value.trim();


    const rating =
        Number(ratingElement.value);


    const comment =
        commentElement.value.trim();


    if (!name || !comment) return;


    const stars =
        "⭐".repeat(
            Math.max(
                1,
                Math.min(5, rating)
            )
        );


    reviewContainer.insertAdjacentHTML(
        "beforeend",
        `

        <div class="review-card">

            <div class="stars">
                ${stars}
            </div>

            <p>
                "${escapeHTML(comment)}"
            </p>

            <h4>
                - ${escapeHTML(name)}
            </h4>

        </div>

        `
    );


    showToast(
        "⭐ আপনার review সফলভাবে যোগ হয়েছে!"
    );


    event.target.reset();
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) {

        alert(message);

        return;
    }


    toast.innerText =
        message;


    toast.classList.add("show");


    clearTimeout(
        window.tanvirToastTimer
    );


    window.tanvirToastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* ================= MOBILE MENU ================= */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const mobileNav =
        document.querySelector(
            ".mobile-nav"
        );


    if (
        !menuToggle ||
        !mobileNav
    ) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle("open");

            menuToggle.classList.toggle("active");

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove("open");

                    menuToggle.classList.remove("active");

                }
            );

        });
}


/* ================= HEADER SCROLL ================= */

function initHeaderScroll() {

    const header =
        document.getElementById("main-header") ||
        document.querySelector("header");


    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();
}


/* ================= CATEGORY BUTTONS ================= */

function initCategoryButtons() {

    document
        .querySelectorAll(".cat-btn")
        .forEach(button => {

            if (
                button.hasAttribute("onclick")
            ) {
                return;
            }


            button.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.category ||
                        this.dataset.filter ||
                        "all";


                    filterMenu(
                        category,
                        {
                            currentTarget: this
                        }
                    );

                }
            );

        });
}


/* ================= SMOOTH SCROLL ================= */

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });
}


/* ================= SEARCH ENTER ================= */

function initSearch() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        searchMenu
    );


    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                searchInput.value = "";

                searchMenu();

                searchInput.blur();

            }

        }
    );
}


/* ================= DATE MIN ================= */

function initBookingDate() {

    const dateInput =
        document.querySelector(
            '.booking-form input[type="date"]'
        );


    if (!dateInput) return;


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        `${year}-${month}-${day}`;
}


/* ================= ESC KEY ================= */

function initEscapeKey() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeCart();

            }

        }
    );
}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedCart();

        loadMenu();

        updateCartUI();

        initMobileMenu();

        initHeaderScroll();

        initCategoryButtons();

        initSmoothScroll();

        initSearch();

        initBookingDate();

        initEscapeKey();

    }
);


/* ================= GLOBAL FUNCTIONS ================= */
/*
   These make the functions available
   to inline onclick="" in HTML.
*/

window.loadMenu = loadMenu;
window.filterMenu = filterMenu;
window.searchMenu = searchMenu;
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.applyCoupon = applyCoupon;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.sendWhatsAppOrder = sendWhatsAppOrder;
window.checkout = checkout;
window.handleBooking = handleBooking;
window.addReview = addReview;
window.showToast = showToast;