// Select necessary DOM elements
const searchInput = document.getElementById('search');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Initialize cart
let cart = [];

// Function to search products
function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  
  document.querySelectorAll('.card').forEach((card) => {
    const productName = card.querySelector('h4').textContent.toLowerCase();
    card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
  });
}

// Function to add item to cart
function addItemToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: item.name, price: item.price, quantity: 1 });
  }
  
  updateCart();
}

// Function to update cart display
function updateCart() {
  cartList.innerHTML = '';
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;
    cartList.appendChild(cartItem);
  });
  
  cartTotal.textContent = `Total: ₹${totalPrice}`;
}

// Function to handle checkout
function handleCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  else{
    document.getElementById('checkout-btn').addEventListener('click', function() {
      window.location.href = 'checkout.html';
  });
  }
  //alert('Proceeding to checkout!');
  // Add checkout functionality here
}

// Function to clear cart
function clearCart() {
  cart = [];
  updateCart();
}

// Event listeners for add to cart buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.card');
    const item = {
      name: productCard.querySelector('h4').textContent,
      price: parseFloat(productCard.querySelector('p').textContent.replace('Rs.', ''))
    };
    addItemToCart(item);
  });
});

// Event listeners for checkout and clear cart buttons
checkoutBtn.addEventListener('click', handleCheckout);
clearCartBtn.addEventListener('click', clearCart);

// Initialize search functionality
searchInput.addEventListener('input', searchProducts);




