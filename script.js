document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            addItemToCart(name, price);
            updateCart();
        });
    });

    function addItemToCart(name, price) {
        for (let item of cart) {
            if (item.name === name) {
                item.quantity++;
                return;
            }
        }
        cart.push({ name, price, quantity: 1 });
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('col-md-12', 'mb-3');
            itemElement.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5>${item.name}</h5>
                            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <div>
                            <button class="btn btn-danger btn-sm remove-from-cart" data-name="${item.name}">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);

            itemElement.querySelector('.remove-from-cart').addEventListener('click', () => {
                removeFromCart(item.name);
                updateCart();
            });
        });

        cartTotalElement.innerText = total.toFixed(2);
    }

    function removeFromCart(name) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].quantity--;
                if (cart[i].quantity === 0) {
                    cart.splice(i, 1);
                }
                return;
            }
        }
    }
});
