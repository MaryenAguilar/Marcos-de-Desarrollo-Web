// Cargar dinámicamente header y footer
window.addEventListener('DOMContentLoaded', () => {
  fetch('../html/header.html')
      .then(res => res.text())
      .then(data => {
          document.getElementById('header-placeholder').innerHTML = data;
          inicializarCarrito(); // 👈 Esperamos a que el header esté cargado
      });

  fetch('../html/footer.html')
      .then(res => res.text())
      .then(data => document.getElementById('footer-placeholder').innerHTML = data);
});

function inicializarCarrito() {
  const carrito = [];
  const contadorCarrito = document.querySelector('.cart-count');
  const itemsCarrito = document.querySelector('.cart-items');
  const precioTotal = document.querySelector('.total-price');
  const sidebarCarrito = document.querySelector('.cart-sidebar');
  const overlayCarrito = document.querySelector('.cart-overlay');
  const botonCarrito = document.querySelector('.cart-toggle');
  const cerrarCarrito = document.querySelector('.close-cart');
  const botonPagar = document.querySelector('.checkout-btn');

  if (!botonCarrito || !cerrarCarrito || !sidebarCarrito) {
      console.error('❌ Elementos del carrito no encontrados.');
      return;
  }

  botonCarrito.addEventListener('click', alternarCarrito);
  cerrarCarrito.addEventListener('click', alternarCarrito);
  overlayCarrito.addEventListener('click', alternarCarrito);

  const botonesAgregar = document.querySelectorAll('.add-to-cart');
  botonesAgregar.forEach(boton => {
      boton.addEventListener('click', agregarProducto);
  });

  botonPagar.addEventListener('click', finalizarCompra);

  function alternarCarrito() {
      sidebarCarrito.classList.toggle('active');
      overlayCarrito.classList.toggle('active');
  }

  function agregarProducto(evento) {
      const boton = evento.target;
      const producto = {
          id: boton.getAttribute('data-id'),
          nombre: boton.getAttribute('data-name'),
          precio: parseFloat(boton.getAttribute('data-price'))
      };
      carrito.push(producto);
      actualizarCarrito();
  }

  function actualizarCarrito() {
      itemsCarrito.innerHTML = '';
      let total = 0;
      carrito.forEach(producto => {
          const item = document.createElement('div');
          item.classList.add('cart-item');
          item.innerHTML = `<p>${producto.nombre} - $${producto.precio}</p>`;
          itemsCarrito.appendChild(item);
          total += producto.precio;
      });
      precioTotal.textContent = total.toFixed(2);
  }

  function finalizarCompra() {
      if (carrito.length === 0) {
          alert('Tu carrito está vacío');
      } else {
          alert('Compra realizada');
          carrito.length = 0;
          actualizarCarrito();
      }
  }
}
