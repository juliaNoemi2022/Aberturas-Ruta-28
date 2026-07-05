// Inicializar el carrito desde el almacenamiento del navegador (localStorage)
let carrito = JSON.parse(localStorage.getItem("carrito_ruta28")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    
    // Validamos si la lista del carrito existe en la página actual
    const listaCarrito = document.getElementById("lista-carrito");
    
    if (listaCarrito) {
        // --- ESTAMOS EN CARRITO.HTML ---
        renderizarCarrito();
        configurarBotonesCarrito();
    } else {
        // --- ESTAMOS EN INDEX.HTML ---
        configurarBotonesTienda();
    }
});

// --- LÓGICA DE LA TIENDA (index.html) ---
function configurarBotonesTienda() {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // currentTarget asegura capturar el botón de forma robusta
            const id = e.currentTarget.getAttribute("data-id");
            const nombre = e.currentTarget.getAttribute("data-nombre");
            const precio = parseFloat(e.currentTarget.getAttribute("data-precio"));
            
            agregarAlCarrito(id, nombre, precio);
        });
    });
}

function agregarAlCarrito(id, nombre, precio) {
    // Comparamos forzando los tipos a String para evitar fallas
    const existe = carrito.find(item => String(item.id) === String(id));
    
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id: String(id), nombre, precio, cantidad: 1 }); 
    }
    
    guardarCambios();
    alert(`"${nombre}" se agregó al carrito.`);
}

// --- LÓGICA DEL CARRITO (carrito.html) ---
function renderizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalPrecio = document.getElementById("total-precio");
    
    if (!listaCarrito || !totalPrecio) return;
    listaCarrito.innerHTML = "";
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<li style="list-style: none; color: #777; text-align: center; padding: 20px 0; width: 100%;">El carrito está vacío.</li>`;
        totalPrecio.innerText = "0";
        return;
    }
    
    let totalAcumulado = 0;
    
    carrito.forEach(item => {
        const cant = item.cantidad || 1;
        const subtotal = item.precio * cant;
        totalAcumulado += subtotal;
        
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.nombre}</strong> <br>
                <small>$${item.precio.toLocaleString('es-AR')} x ${cant}</small>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-weight: bold;">$${subtotal.toLocaleString('es-AR')}</span>
                <button class="btn-eliminar-item" data-id="${item.id}">&times;</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });
    
    totalPrecio.innerText = totalAcumulado.toLocaleString('es-AR');
    configurarBotonesEliminar();
}

function configurarBotonesCarrito() {
    const btnVaciar = document.getElementById("vaciar-carrito");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            if (carrito.length > 0 && confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
                vaciarCarrito();
            }
        });
    }
    
    const btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío. Agregá productos antes de comprar.");
                return;
            }
            alert("¡Gracias por su compra!");
            vaciarCarrito();
        });
    }
}

function configurarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar-item");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            carrito = carrito.filter(item => String(item.id) !== String(id));
            guardarCambios();
            renderizarCarrito();
        });
    });
}

function vaciarCarrito() {
    carrito = [];
    guardarCambios();
    renderizarCarrito();
}

// --- CONTROLES GLOBALES ---
function guardarCambios() {
    localStorage.setItem("carrito_ruta28", JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const contador = document.getElementById("contador-productos");
    if (contador) {
        const totalProductos = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
        contador.innerText = totalProductos;
    }
}