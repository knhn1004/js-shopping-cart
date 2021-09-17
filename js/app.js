// show cart
const cartInfo = document.getElementById('cart-info');
const cart = document.getElementById('cart');

cartInfo.addEventListener('click', () => {
  cart.classList.toggle('show-cart');
});

// add items to the cart
const cartBtn = document.querySelectorAll('.store-item-icon');
cartBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    //console.log(e.target);
    // fetch item
    if (e.target.parentElement.classList.contains('store-item-icon')) {
      let fullPath = e.target.parentElement.previousElementSibling.src;
      let pos = fullPath.indexOf('img') + 3;
      let partPath = fullPath.slice(pos);

      const item = {};
      item.img = `img-cart${partPath}`; // img path

      let name =
        e.target.parentElement.parentElement.nextElementSibling.children[0]
          .children[0].textContent;
      item.name = name; // name
      let price =
        e.target.parentElement.parentElement.nextElementSibling.children[0]
          .children[1].textContent;
      price = parseFloat(price.slice(1).trim()).toFixed(2);
      item.price = price; // price

      // end fetch item

      // add to cart list
      const cartItem = document.createElement('div');
      cartItem.classList.add(
        'cart-item',
        'd-flex',
        'justify-content-between',
        'text-capitalize',
        'my-3'
      );
      cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
	  `;

      // select cart
      const total = document.querySelector('.cart-total-container');
      cart.insertBefore(cartItem, total);
      //  alert('item added to cart!');
      showTotal();
    }
  });
});

// show total
const showTotal = () => {
  const total = [];
  const items = document.querySelectorAll('.cart-item-price');
  items.forEach(i => {
    total.push(parseFloat(i.textContent));
  });
  const totalMoney = total.reduce((t, ele) => {
    t += ele;
    return t;
  }, 0);
  //  console.log(totalMoney);

  document.getElementById('cart-total').textContent = totalMoney;
  document.querySelector('.item-total').textContent = totalMoney;
  document.getElementById('item-count').textContent = total.length;
};
