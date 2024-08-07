document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('addToCartButton');
    const addToFavouritesButton = document.getElementById('addToFavouritesButton');
    const applyFavouritesButton = document.getElementById('ApplyFavouritesbutton');
    const resetButton = document.getElementById('resetButton');
    const orderTableBody = document.getElementById('order-table-body');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    const TAX_RATE = 0.05; // 5% tax

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            handleAddToCartOrFavourites(false);
        });
    }

    if (addToFavouritesButton) {
        addToFavouritesButton.addEventListener('click', () => {
            handleAddToCartOrFavourites(true);
        });
    }

    if (applyFavouritesButton) {
        applyFavouritesButton.addEventListener('click', () => {
            handleApplyFavourites();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetOrderSummary();
        });
    }

    function handleAddToCartOrFavourites(isFavourite) {
        const quantities = document.querySelectorAll('.quantity');
        const items = [];

        quantities.forEach(quantityInput => {
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                const name = quantityInput.getAttribute('data-name');
                const price = parseFloat(quantityInput.getAttribute('data-price'));
                items.push({ name, quantity, price });
            }
        });

        if (isFavourite) {
            localStorage.setItem('favourites', JSON.stringify(items));
            alert('Added to favourites');
        } else {
            updateOrderSummary(items);
        }
    }

    function handleApplyFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.length > 0) {
            updateOrderSummary(favourites);
        } else {
            alert('No favourites to apply');
        }
    }

    function updateOrderSummary(items) {
        items.forEach(item => {
            const existingRow = orderTableBody.querySelector(`tr[data-name="${item.name}"]`);
            if (existingRow) {
                const existingQuantityCell = existingRow.querySelector('.quantity-cell');
                const existingQuantity = parseInt(existingQuantityCell.textContent);
                existingQuantityCell.textContent = existingQuantity + item.quantity;
            } else {
                const row = document.createElement('tr');
                row.setAttribute('data-name', item.name);
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td class="quantity-cell">${item.quantity}</td>
                    <td>Rs ${item.price.toFixed(2)}</td>
                    <td class="total-cell">Rs ${(item.price * item.quantity).toFixed(2)}</td>
                `;
                orderTableBody.appendChild(row);
            }
        });

        updateTotals();
    }

    function updateTotals() {
        let subtotal = 0;
        orderTableBody.querySelectorAll('tr').forEach(row => {
            const totalCell = row.querySelector('.total-cell');
            const total = parseFloat(totalCell.textContent.replace('Rs ', ''));
            subtotal += total;
        });

        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        subtotalElement.textContent = `Rs ${subtotal.toFixed(2)}`;
        taxElement.textContent = `Rs ${tax.toFixed(2)}`;
        totalElement.textContent = `Rs ${total.toFixed(2)}`;
    }

    function resetOrderSummary() {
        orderTableBody.innerHTML = '';
        subtotalElement.textContent = 'Rs 0.00';
        taxElement.textContent = 'Rs 0.00';
        totalElement.textContent = 'Rs 0.00';
        document.querySelectorAll('.quantity').forEach(input => input.value = '0');
    }
});

document.getElementById('checkOutBtn').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var contact = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var deliveryDate = document.getElementById('deliveryDate').value;
    var deliveryMethod = document.getElementById('deliveryMethod').value;
    var paymentMethod = document.getElementById('paymentMethod').value;

    if (name && address && contact && email && deliveryDate && deliveryMethod && paymentMethod) {
        document.getElementById('thankYouMessage').style.display = 'block';
    } else {
        alert('Please fill in all the fields.');
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('email').value = '';
    document.getElementById('deliveryDate').value = '';
    document.getElementById('deliveryMethod').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('thankYouMessage').style.display = 'none';
});

        function displayCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const tbody = document.querySelector('#order-summary tbody');

            cart.forEach(item => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const priceCell = document.createElement('td');

                nameCell.textContent = item.name;
                priceCell.textContent = `$${item.price}`;

                row.appendChild(nameCell);
                row.appendChild(priceCell);
                tbody.appendChild(row);
            });
        }

        window.onload = displayCart;
    
