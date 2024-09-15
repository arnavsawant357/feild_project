const searchInput = document.getElementById('search');

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    document.querySelectorAll('.card').forEach((card) => {
      const productName = card.querySelector('h4').textContent.toLowerCase();
      card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
    });
  }

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

  searchInput.addEventListener('input', searchProducts);