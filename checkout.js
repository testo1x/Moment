let listCart = [];

function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
  // clear data default
  let listCartHTML = document.querySelector('.returnCart .list');
  listCartHTML.innerHTML = '';

  let totalQuantityHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');
  let totalQuantity = 0;
  let totalPrice = 0;

  // if there are products in the cart
  if (listCart) {
    listCart.forEach(product => {
      if (product) {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML =
          `<img src="${product.image}">
          <div class="info">
              <div class="name">${product.name}</div>
              <div class="price">$${product.price}/1 product</div>
          </div>
          <div class="quantity">${product.quantity}</div>
          <div class="returnPrice">$${product.price * product.quantity}</div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + (product.price * product.quantity);
      }
    });
  }

  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = '$' + totalPrice;

  // Add checkout button event listener
  let checkoutButton = document.querySelector('.checkoutButton');
  checkoutButton.addEventListener('click', sendOrderToWhatsApp);
}

function sendOrderToWhatsApp() {
  // Create an array to store the selected products
  let selectedProducts = [];

  // Iterate through each product in the cart and add it to the selectedProducts array
  if (listCart) {
    listCart.forEach(product => {
      if (product) {
        selectedProducts.push(product);
      }
    });
  }

  // Send the selectedProducts array to the server-side endpoint or API for sending the WhatsApp message
  // Replace the placeholder URL with your actual server-side endpoint
  let url = 'https://api.whatsapp.com/send?phone';
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log('WhatsApp message sent successfully!');
    } else if (xhr.status !== 200) {
      console.error('Error sending WhatsApp message:', xhr.status);
    }
  };
  xhr.send(JSON.stringify(selectedProducts));
}
