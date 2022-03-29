// FETCH ESTRENOS
const insertarEstrenos = () =>{
    return fetch ("json/estrenos.json")
}

insertarEstrenos()
    .then(resultado => resultado.json())
    .then(estrenos => {
        for (const estreno of estrenos) {
            mostrarEstrenos(estreno);
        }
    })

const mostrarEstrenos = (estreno) => {
    const listadoEstrenos = document.getElementById("listadoEstrenos");

    let contenedor = document.createElement("div");
    contenedor.className = "estreno";
    contenedor.id = estreno.id;
    contenedor.innerHTML = `
        <div class="cardPelicula">
            <img src="${estreno.imagen}" alt="${estreno.imgAlt}">
            <h3>${estreno.nombre}</h3>
        </div>`;
    listadoEstrenos.appendChild(contenedor);
}

// FETCH PROXIMAMENTE
const insertarProximamente = () =>{
    return fetch ("json/proximamente.json")
}

insertarProximamente()
    .then(resultado => resultado.json())
    .then(proximamente => {
        for (const prox of proximamente) {
            mostrarProximamente(prox);
        }
    })

const mostrarProximamente = (prox) => {
    const listadoProximamente = document.getElementById("listadoProximamente");

    let contenedor = document.createElement("div");
    contenedor.className = "prox";
    contenedor.id = prox.id;
    contenedor.innerHTML = `
        <div class="cardPelicula">
            <img src="${prox.imagen}" alt="${prox.imgAlt}">
            <h3>${prox.nombre}</h3>
        </div>`;
    listadoProximamente.appendChild(contenedor);
}

const carrito = document.getElementById("carrito");
const carritoLocalStorage = [];
let total = 0;
const totalhtml = document.getElementById("totalspan");

// Funciones

// Funciones

const agregarAlCarrito = (producto) => {
    if (carritoLocalStorage.some(p => p.id === producto.id)) {
        carritoLocalStorage[carritoLocalStorage.findIndex(p => p.id === producto.id)].cantidad++;
    }
    else {
        producto.cantidad = 1;
        carritoLocalStorage.push(producto);
    }
    actualizarCarrito();
};

const actualizarCarrito = () => {
    carrito.innerHTML = '';
    for (const producto of carritoLocalStorage) {
        let contenedor = document.createElement("div");
        contenedor.className = "producto-carrito"
        contenedor.id = producto.id;
        contenedor.innerHTML = `
        <div class="productoCarrito">
            <img src="${producto.imagen}" alt="${producto.imgAlt}">
            <p>${producto.cantidad}</p>
            <p>X</p>
            <h3>${producto.nombre}</h3>
            <p class="precioProductos">$ ${producto.precio}</p>
            <button class="eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
        </div>`;
        carrito.appendChild(contenedor);
    }
    localStorage.setItem("carrito", JSON.stringify(carritoLocalStorage));
    actualizarTotal();
    // Eliminar producto del carrito
    const btns_eliminar = document.getElementsByClassName('eliminar');
    for (const btn of btns_eliminar) {
        btn.addEventListener('click', () => eliminarProducto(btn.id));
    }
}

const eliminarProducto = (id) => {
    let indice = carritoLocalStorage.findIndex(p => p.id == id);
    carritoLocalStorage.splice(indice, 1);
    actualizarCarrito();
}

const actualizarTotal = () => {
    totalhtml.innerHTML = '';
    total = carritoLocalStorage.reduce((acc,producto) => acc += producto.precio*producto.cantidad, 0);
    totalhtml.innerHTML = `$${total}`;
}

// Local Storage del carrito
const productosLocalStorage = JSON.parse(localStorage.getItem("carrito"));

if (productosLocalStorage !== null) {
    for (const producto of productosLocalStorage) {
        agregarAlCarrito(producto);
    }
}

// Notificacion al agregar producto al carrito
const notificacionCarrito = () => {
    Toastify({
        text: `✓ Producto agregado`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            padding: "0.5em 1.5em",
            borderRadius: "10px",
            background: "#DC1A28",
            color: "white",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

// Iniciar Sesion

// Variables Local Storage
let emailStorage = localStorage.getItem('emailUsuario');
let passwordStorage = localStorage.getItem('passwordUsuario');

// Variables Local Session
let valorEmail = sessionStorage.getItem('valorEmail');
let valorPassword = sessionStorage.getItem('valorPassword');

// Variables DOM
const exampleModal = document.getElementById("exampleModal")
const formSesion = document.getElementById("formSesion");
const bodySesion = document.getElementById("bodySesion");
const emailUser = document.getElementById("emailUser");
const emailSesion = document.getElementById("emailSesion");
const passwordSesion = document.getElementById("passwordSesion");
const logOut = document.getElementById("logOut");

// Listeners
emailSesion.onchange = (e) => {
    sessionStorage.setItem("valorEmail", e.target.value);
}

passwordSesion.onchange = (e) => {
    sessionStorage.setItem("valorPassword", e.target.value);
}

formSesion.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem('emailUsuario', formSesion.children[1].value);
    localStorage.setItem('passwordUsuario', formSesion.children[3].value);
    emailStorage = formSesion.children[1].value;
    verificarForm();
    window.location.reload();
});

const verificarForm = () => {
    const funcionIf = () => {
        exampleModal.remove();
        emailUser.innerHTML = `${emailStorage}`;
        logOut.innerHTML = `<i class="bi bi-box-arrow-right"></i>`
    }

    const funcionElse = () => {}

    emailStorage && emailStorage !== 'null' ? funcionIf() : funcionElse();
}

const completarInicioSesion = () => {
    emailSesion.value = valorEmail;
    passwordSesion.value = valorPassword;
}

completarInicioSesion();
verificarForm();

// Log Out
logOut.onclick = () => {
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("passwordUsuario");
    emailUser.remove();
    logOut.remove();
    window.location.reload();
}

// Confirmacion de compra
const confirmarCompra = document.getElementById("confirmarCompra");
confirmarCompra.addEventListener('click', () => {

    Swal.fire({
        title: '¿Está seguro de que desea confirmar la compra?',
        icon: 'warning',
        iconColor: "#DC1A28",
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar compra',
        cancelButtonText: 'No, cancelar compra',
        background: "rgb(30, 30, 30)",
        color: "white",
        confirmButtonColor: "#DC1A28",
        cancelButtonColor: "gray"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Su compra se ha realizado correctamente!',
                icon: 'success',
                iconColor: "#DC1A28",
                background: "rgb(30, 30, 30)",
                color: "white",
                confirmButtonColor: "#DC1A28",
                cancelButtonColor: "gray"
            })
            localStorage.removeItem("carrito");
        }
    })
})


