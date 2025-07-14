document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const carrito = [];
    const contadorCarrito = document.querySelector('.cart-count');
    const itemsCarrito = document.querySelector('.cart-items');
    const precioTotal = document.querySelector('.total-price');
    const sidebarCarrito = document.querySelector('.cart-sidebar');
    const overlayCarrito = document.querySelector('.cart-overlay');
    const botonCarrito = document.querySelector('.cart-toggle');
    const cerrarCarrito = document.querySelector('.close-cart');
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    const botonPagar = document.querySelector('.checkout-btn');

    // Eventos
    botonCarrito.addEventListener('click', alternarCarrito);
    cerrarCarrito.addEventListener('click', alternarCarrito);
    overlayCarrito.addEventListener('click', alternarCarrito);
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    botonPagar.addEventListener('click', finalizarCompra);

    // Funciones
    function alternarCarrito() {
        sidebarCarrito.classList.toggle('active');
        overlayCarrito.classList.toggle('active');
    }

    function agregarProducto(evento) {
        const boton = evento.target;
        const id = boton.getAttribute('data-id');
        const nombre = boton.getAttribute('data-name');
        const precio = parseFloat(boton.getAttribute('data-price'));
        
        agregarAlCarrito(id, nombre, precio);
        actualizarCarrito();
    }

    function agregarAlCarrito(id, nombre, precio) {
        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.id === id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id,
                nombre,
                precio,
                cantidad: 1
            });
        }
    }

    function actualizarCarrito() {
        // Actualizar contador del carrito
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        contadorCarrito.textContent = totalItems;
        
        // Actualizar lista de productos en el carrito
        itemsCarrito.innerHTML = '';
        
        if (carrito.length === 0) {
            itemsCarrito.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
            precioTotal.textContent = '0';
            return;
        }
        
        let total = 0;
        
        carrito.forEach(item => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('cart-item');
            
            elementoProducto.innerHTML = `
                <img src="img/${item.id.includes('anillo') ? 'anillo' : 'collar'}${item.id}.jpg" alt="${item.nombre}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.nombre}</div>
                    <div class="cart-item-price">$${item.precio.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" value="${item.cantidad}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">Eliminar</div>
                </div>
            `;
            
            itemsCarrito.appendChild(elementoProducto);
            
            total += item.precio * item.cantidad;
        });
        
        precioTotal.textContent = total.toFixed(2);
        
        // Agregar eventos a los nuevos botones
        document.querySelectorAll('.decrease-quantity').forEach(boton => {
            boton.addEventListener('click', disminuirCantidad);
        });
        
        document.querySelectorAll('.increase-quantity').forEach(boton => {
            boton.addEventListener('click', aumentarCantidad);
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', cambiarCantidad);
        });
        
        document.querySelectorAll('.remove-item').forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        });
    }

    function disminuirCantidad(evento) {
        const id = evento.target.getAttribute('data-id');
        const producto = carrito.find(item => item.id === id);
        
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            if (confirm('¿Deseas eliminar este producto del carrito?')) {
                eliminarDelCarrito(id);
            }
        }
        
        actualizarCarrito();
    }

    function aumentarCantidad(evento) {
        const id = evento.target.getAttribute('data-id');
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
        actualizarCarrito();
    }

    function cambiarCantidad(evento) {
        const id = evento.target.getAttribute('data-id');
        const nuevaCantidad = parseInt(evento.target.value);
        const producto = carrito.find(item => item.id === id);
        
        if (nuevaCantidad >= 1) {
            producto.cantidad = nuevaCantidad;
        } else {
            producto.cantidad = 1;
            evento.target.value = 1;
        }
        
        actualizarCarrito();
    }

    function eliminarProducto(evento) {
        const id = evento.target.getAttribute('data-id');
        eliminarDelCarrito(id);
        actualizarCarrito();
    }

    function eliminarDelCarrito(id) {
        const indiceProducto = carrito.findIndex(item => item.id === id);
        if (indiceProducto !== -1) {
            carrito.splice(indiceProducto, 1);
        }
    }

    function finalizarCompra() {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        alert(`¡Gracias por tu compra! Total: $${precioTotal.textContent}`);
        // Vaciar el carrito después de la compra
        carrito.length = 0;
        actualizarCarrito();
        alternarCarrito();
    }
});