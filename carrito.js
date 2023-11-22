let librosCarrito = localStorage.getItem("libros-carrito");
librosCarrito = JSON.parse(librosCarrito);
const carritoVacio = document.querySelector("#carrito-vacio");
const contLibrosCarrito = document.querySelector("#cont-libros-carrito");
let eliminarLibro = document.querySelectorAll(".carrito-eliminar");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const carritoComprar = document.querySelector("#carrito-comprar");
const total = document.querySelector("#total");

function subirLibrosAlCarrito() {
    if(librosCarrito.length > 0) {
        carritoVacio.classList.add("no-mostrar");

        contLibrosCarrito.innerHTML = "";
    
        librosCarrito.forEach(libro => {
        const contenedorCarrito = document.createElement("div");
        contenedorCarrito.classList.add("carrito-libro")
        contenedorCarrito.innerHTML = `
            <img class="carrito-libro-img" src="${libro.imagen}" alt="${libro.nombre}">
            <div class="carrito-libro-titulo">
                <small>Título</small>
                <h3>${libro.nombre}</h3>
            </div>
            <div class="carrito-libro-cantidad">
                <small>Cantidad</small>
                <p>${libro.cantidad}</p>
            </div>
            <div class="carrito-libro-precio">
                <small>Precio</small>
                <p>$${libro.precio * libro.cantidad}</p>
            </div>
    
            <button class="carrito-eliminar" id="${libro.id}"><i class="fa-solid fa-trash-can"></i></button>
            `;
    
            contLibrosCarrito.append(contenedorCarrito);
    
        })
    }else{
        carritoVacio.classList.remove("no-mostrar");
        contLibrosCarrito.classList.add("no-mostrar");
        carritoComprar.classList.add("no-mostrar");
        vaciarCarrito.classList.add("no-mostrar");
    }
    newBtnEliminarCarrito();
    compraTotal();

} 

subirLibrosAlCarrito();

function newBtnEliminarCarrito() {
    eliminarLibro = document.querySelectorAll(".carrito-eliminar");
    eliminarLibro.forEach(btn => {
        btn.addEventListener("click", eliminarLibroDelCarrito)
    });
}

contLibrosCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("carrito-eliminar")) {
        eliminarProducto(e);
    }
});

function eliminarLibroDelCarrito(e) {
    const idBtn = e.currentTarget.id;
    const indice = librosCarrito.findIndex(libro => libro.id == idBtn);
    if (indice !== -1) {
        librosCarrito.splice(indice, 1);
        subirLibrosAlCarrito();
        localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
    }
}

vaciarCarrito.addEventListener("click", vaciarElCarrito);

function vaciarElCarrito() {
    librosCarrito.length = 0;
    localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
    subirLibrosAlCarrito();
    newBtnEliminarCarrito();
}

function compraTotal() {
    const calcularTotal = librosCarrito.reduce((acumulador, libro) => acumulador + (libro.precio * libro.cantidad), 0);
    total.innerText = `$${calcularTotal}`;
}

carritoComprar.addEventListener("click", comprar);

function comprar() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Compra realizada",
        showConfirmButton: false,
        timer: 3000
    });
    vaciarElCarrito();
}