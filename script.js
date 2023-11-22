const libros = [
    {id: 1, nombre: "La casa en el mar más azul", imagen: "images/lacasa.jfif", categoría: {id: "juvenil"}, genero: "fantasia", autor: "TJ Klune", precio: 6800},
    {id: 2, nombre: "El día que dejó de nevar en Alaska", imagen: "images/alaska.jfif", categoría: {id:"juvenil"}, genero: "romantico", autor: "Alice Kellen", precio: 6200},
    {id: 4, nombre: "Nosotros en la luna", imagen: "images/nosotros.jfif", categoría: {id:"juvenil"}, genero: "romantico", autor: "Alice Kellen", precio: 6900},
    {id: 5, nombre: "Los dos amores de mi vida", imagen: "images/losdos.webp", categoría: {id:"juvenil"}, genero: "romantico", autor: "Taylor Jenkins Reid", precio: 6200},
    {id: 6, nombre: "El mapa de los anhelos", imagen: "images/elmapa.jfif", categoría: {id:"juvenil"}, genero: "romantico", autor: "Alice Kellen", precio: 6900},
    {id: 8, nombre: "La vida invisible de Addie LaRue", imagen: "images/lavida.jfif", categoría: {id:"juvenil"}, genero: "fantasia", autor: "Victoria Schwab", precio: 8000},
    {id: 9, nombre: "El Ladron Del Rayo - Percy Jackson 1", imagen: "images/percy.png", categoría: {id:"juvenil"}, genero: "fantasia", autor: "Rick Riordan", precio: 4900},
    {id: 10, nombre: "Asesino de brujas 1: La bruja blanca", imagen: "images/brujas.jpg", categoría: {id:"juvenil"}, genero: "fantasia", autor: "Shelby Mahurin", precio: 6900},
    {id: 11, nombre: "Despierta", imagen: "images/despierta.jpg", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Lorena Pronsky", editorial: "Vergara", precio: 5800},
    {id: 13, nombre: "Encuentra Tu Persona Vitamina", imagen: "images/vitamina.jfif", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Marian Rojas Estapé", precio: 5800},
    {id: 14, nombre: "El sutil arte de que (casi todo) te importe una mierda", imagen: "images/sutilarte.png", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Mark Manson", precio: 5400},
    {id: 15, nombre: "Te espero en el fin del mundo", imagen: "images/findelmundo.webp", categoría: {id:"juvenil"}, genero: "romantico", autor: "Andrea Longarela", precio: 6900},
    {id: 16, nombre: "No amarás", imagen: "images/noamaras.jfif", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Lorena Pronsky", precio: 6000},
    {id: 17, nombre: "El arte de no amargarse la vida", imagen: "images/amargarselavida.webp", categoría: {id:"bienestar"}, genero: "Autoayuda", autor: "Rafael Santandreu", precio: 5500},
    {id: 18, nombre: "Este dolor no es mío", imagen: "images/estedolor.webp", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Mark Wolynn", precio: 5500},
    {id: 19, nombre: "Flores en el barro", imagen: "images/floresenelbarro.jfif", categoría: {id:"bienestar"}, genero: "autoayuda", autor: "Lorena Pronsky", precio: 5200},
    {id: 20, nombre: "Cuando no queden más estrellas que contar", imagen: "images/estrellas.jfif", categoría:{id:"juvenil"}, genero: "romantico", autor: "María Martínez", precio: 7200},
    {id: 21, nombre: "Saga Heartstopper", imagen: "images/heartstopper2.jfif", categoría: {id:"sagas"}, generimagen: "images/elchicoquedibujaba.jpg", o: "Romántico", autor: "Alice Oseman", precio: 30000},
    {id: 22, nombre: "Saga Percy Jackson", imagen: "images/sagap.webp", categoría: {id:"sagas"}, genero: "fantasia", autor: "Rick Riordan", precio: 35000},
    {id: 23, nombre: "Saga Ciudad medialuna", imagen: "images/sagac.jpg", categoría: {id:"sagas"}, genero: "fantasia", autor: "Sarah J. Maas", precio: 25000},
    {id: 24, nombre: "Saga Asesino de Brujas", imagen: "images/sagaA.jpg", categoría: {id:"sagas"}, genero: "fantasia", autor: "Shelby Mahurin", precio: 24000},
]


const contenedorLibros = document.querySelector("#contenedor-libros");
const filtrarLibros = document.querySelector("#filtrar-libros");
const btnCategorias = document.querySelectorAll(".btn-categoria");
let tituloCategoria = document.querySelector("#titulo-categoria");
let btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const masVendidos = document.querySelector("#libros-mas-vendidos");


function newBtnAgregarCarrito() {
    btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");
    btnAgregarCarrito.forEach(btn => {
        btn.addEventListener("click", agregarCarrito)
    });
}

function cargarLibros(productosElegidos) {

    contenedorLibros.innerHTML = "";

    productosElegidos.forEach(libro => {
        const div = document.createElement("div");
        div.classList.add("libro");
        div.innerHTML = `
        <img class = "libro-imagen" src="${libro.imagen}" alt="${libro.nombre}">
        <div class="detalles">
            <h3 class="libro-titulo">${libro.nombre}</h3>
            <p>Autor/a: ${libro.autor}</p>
            <p>$${libro.precio}</p>
            <button class="agregar-carrito" id="${libro.id}">AGREGAR AL CARRITO</button>
        </div>
        `;
        contenedorLibros.append(div);
    });
    
    newBtnAgregarCarrito(); 
}

cargarLibros(libros);

let librosCarrito;
let carrito = localStorage.getItem("libros-carrito");

carrito 
? librosCarrito = JSON.parse(carrito)
: librosCarrito = [];

btnCategorias.forEach(btn => {
    btn.addEventListener("click", (e) => {

        if (e.currentTarget.id != "todos") {
            const categoriaSeleccionada = e.currentTarget.id;
            tituloCategoria.innerText = categoriaSeleccionada;
            const librosCategoria = libros.filter(libro => libro.categoría.id === categoriaSeleccionada);
            cargarLibros(librosCategoria);
        } else {
            tituloCategoria.innerText = "todos los libros";
            cargarLibros(libros);
        }
    });
});

function agregarCarrito(e) {
    const idLibro = e.currentTarget.id;
    const libroAgregado = libros.find(libro => libro.id == idLibro);

    if (libroAgregado) {
        if (librosCarrito.some(libro => libro.id == idLibro)) {
            const libroExistente = librosCarrito.find(libro => libro.id == idLibro);
            libroExistente.cantidad++;
        } else {
            libroAgregado.cantidad = 1;
            librosCarrito.push(libroAgregado);
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se agregó al carrito",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.setItem("libros-carrito", JSON.stringify(librosCarrito));
    }
}

const librosMasVendidos = async () => {
    const respuesta = await fetch("vendidos.json");
    const librosVendidos = await respuesta.json();

    librosVendidos.forEach(libro => {
        const divMasVendidos = document.createElement("div");
        divMasVendidos.classList.add("libro");
        divMasVendidos.innerHTML = `
        <img class="libro-imagen" src="${libro.imagen}" alt="${libro.nombre}">
        <div class="detalles">
            <h3 class="libro-titulo">${libro.nombre}</h3>
            <p>Autor/a: ${libro.autor}</p>
            <p>$${libro.precio}</p>
            <button class="agregar-carrito" id="boton${libro.id}">AGREGAR AL CARRITO</button>
        </div>
        `;
        masVendidos.append(divMasVendidos);
    });

    btnAgregarCarrito = document.querySelectorAll(".agregar-carrito");
    btnAgregarCarrito.forEach(btn => {
        btn.addEventListener("click", agregarCarrito)
    });

    newBtnAgregarCarrito();
}
librosMasVendidos();
