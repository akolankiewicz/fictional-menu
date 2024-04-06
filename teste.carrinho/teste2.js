document.addEventListener("DOMContentLoaded", function() {
  const cartItemsList = document.getElementById('cart-items');
  let storedCartItems = [];

  // ve se existem itens e os recupera
  if (localStorage.getItem('cartItems')) {
    storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    renderCartItems();
  }

  // add um item ao carrinho
  function addToCart(name, price) {
    storedCartItems.push({ name, price });
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
    renderCartItem(name, price);
  }

  // remove um item do carrinho
  function removeFromCart(index) {
    storedCartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
    renderCartItems();
  }

  // printa os itens do carrinho
  function renderCartItems() {
    cartItemsList.innerHTML = ''; 
    storedCartItems.forEach((item, index) => {
      renderCartItem(item.name, item.price, index);
    });
  }

  // reconhece um item do carrinho
  function renderCartItem(name, price, index) {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${name} - ${price}`;
    cartItem.classList.add('cart-item');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('btn-remove-from-cart');
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    cartItem.appendChild(removeButton);
    cartItemsList.appendChild(cartItem);
  }

  // add uma linha para cada botão 
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const price = this.getAttribute('data-price');
      addToCart(name, price);
    });
  });
});
