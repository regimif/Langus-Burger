const dateSpan = document.getElementById("date-span");
const menu = document.getElementById("menu")
const drinks = document.getElementById("drinks")
const cartButton = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const adressInput = document.getElementById("adress-input");
const adressWarn = document.getElementById("adress-warn");
const exitModalButton = document.getElementById("exit-modal-btn");
const confirmModalButton = document.getElementById("confirm-modal-btn");


let cart = []

cartButton.addEventListener('click', function(){
  updateCartModal()
    cartModal.style.display = "flex";
})

exitModalButton.addEventListener('click', function(){
    cartModal.style.display = "none";
})

cartModal.addEventListener('click', function(e){
    if(e.target === cartModal){
        cartModal.style.display = "none"
    }
})

menu.addEventListener("click", function(e){
  let parentButton = e.target.closest(".add-to-cart-btn");
  if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    addToCart(name, price)
  }
})


function addToCart(name, price){

  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    existingItem.quantity += 1
  }
  else{
    cart.push({
      name,
      price,
      quantity: 1
    })
  }

  updateCartModal()
}

function updateCartModal(){
  cartItems.innerHTML = ""
  let total = 0

  cart.forEach(item =>{
    const cartItemElement = document.createElement("div")
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between mt-2">
      <div>
        <p class="font-medium">${item.name}</p>
        <p>Qt: ${item.quantity}</p>
        <p class="font-medium mt-2">$${item.price.toFixed(2)}</p>
      </div>

      <button class="remove-button" data-name="${item.name}">
        Remove
      </button>
    </div>
    `

    total += item.price * item.quantity
    
    cartItems.appendChild(cartItemElement)
  })
  cartTotal.textContent = total.toLocaleString("en-US",{
    style: "currency",
    currency: "USD"
  })

  cartCount.textContent = cart.length
}



// Remove item from cart
cartItems.addEventListener("click", function(event){
  if(event.target.classList.contains("remove-button")){
    const name = event.target.getAttribute("data-name")
    removeItemCart(name)
  }
})


function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name)

  if(index !== -1){
    const item = cart[index]
    if(item.quantity > 1){
      item.quantity-= 1
      updateCartModal()
      return
    }
    cart.splice(index, 1)
    updateCartModal()
  }
}

adressInput.addEventListener("input", function(event){
  const inputValue = event.target.value

  if(inputValue !== ""){
    adressInput.classList.remove("border-red-500")
    adressWarn.classList.add("hidden")
  }
})

confirmModalButton.addEventListener("click", function(){

  const isOpen = checkStoreOpen()
  if(!isOpen){
    Toastify({
      text: "Sorry! We are closed at the moment! Try again later.",
      duration: 4500,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #B22222, #FF6347)",
      },
    }).showToast();

    return
  }

  if(cart.length === 0)return
  if(adressInput.value === ""){
      adressWarn.classList.remove("hidden")
      adressInput.classList.add("border-red-500")
      return
    }

  // Send order to API on WhatsApp
  const cartItems = cart.map((item) =>{
    return(
      `*${item.name}* Quantity: (*${item.quantity}*) Price: *$${item.price}*\n\n`
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "5535991703710"

  Toastify({
    text: "Almost done! We are redirecting you to Whatsapp!",
    duration: 4500,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #006400, #32CD32)",
    },
  }).showToast();

  setTimeout(function () {
    window.open(
      `https://wa.me/${phone}?text=${message}*Adress*: ${adressInput.value}`
    );
    cart = [];
    updateCartModal();
    cartModal.style.display = "none";

  }, 3000);
})



// Check if store is open
function checkStoreOpen(){
  const date = new Date()
  const hour = date.getHours()
  return hour >= 17 && hour < 23 // True
}

const spanItem = document.getElementById("date-span");
const isOpen = checkStoreOpen()

if (isOpen){
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
}
else{
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}













// Update Cart Count Test \/

// const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
// let count = 0
// for (let i = 0; i < addToCartButtons.length; i++) {
//   addToCartButtons[i].addEventListener("click", function () {
//     count++
//     cartCount.innerText = count.toString();
//   });
// }
