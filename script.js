/* =========================================
   TANANIK
   TIENDA
========================================= */


/* =========================================
   CARRITO
========================================= */

let carrito = [];


/* =========================================
   PRODUCTOS
   Los productos vienen de productos.js
========================================= */


/* =========================================
   MOSTRAR TODOS LOS PRODUCTOS
========================================= */

function mostrarProductos(lista = productos) {

    const contenedor =
        document.getElementById("productos");

    if (!contenedor) return;

    contenedor.innerHTML = "";


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className = "product-card";


        let imagenHTML = `
            <img
                src="${producto.image}"
                alt="${producto.nombre}"
                loading="lazy"
            >
        `;


        tarjeta.innerHTML = `

            <div class="product-image">

                ${imagenHTML}

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${producto.categoria}
                </span>


                <h3>
                    ${producto.nombre}
                </h3>


                <p class="product-description">
                    ${producto.descripcion}
                </p>


                <div class="product-bottom">

                    <span class="product-price">

                        ${
                            producto.precio > 0
                            ? `Q${producto.precio.toFixed(2)}`
                            : "Consultar"
                        }

                    </span>


                    <button
                        class="add-button"
                        onclick="agregarAlCarrito(${producto.id})"
                    >
                        Agregar
                    </button>

                </div>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================
   FILTRAR POR CATEGORIA
========================================= */

function mostrarCategoria(categoria) {

    const filtrados =
        productos.filter(
            producto =>
                producto.categoria === categoria
        );

    mostrarProductos(filtrados);

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */

function agregarAlCarrito(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) return;


    /*
        Si todavía no tiene precio,
        no permitimos comprarlo.
    */

    if (producto.precio <= 0) {

        const mensaje =
            `Hola, Tananik. 🧶\n\n` +
            `Quisiera consultar el precio de:\n` +
            `${producto.nombre}`;

        const url =
            `https://wa.me/50249450428?text=${
                encodeURIComponent(mensaje)
            }`;

        window.open(url, "_blank");

        return;
    }


    const existente =
        carrito.find(
            item => item.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1,

            image: producto.image

        });

    }


    actualizarCarrito();

    abrirCarrito();

}


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function actualizarCarrito() {

    const contenedor =
        document.getElementById("cartItems");

    const contador =
        document.getElementById("contadorCarrito");

    const totalElemento =
        document.getElementById("cartTotal");

    const vacio =
        document.getElementById("cartEmpty");

    const footer =
        document.getElementById("cartFooter");


    if (!contenedor) return;


    contenedor.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    carrito.forEach(item => {

        total +=
            item.precio * item.cantidad;

        cantidadTotal +=
            item.cantidad;


        const elemento =
            document.createElement("div");

        elemento.className =
            "cart-item";


        elemento.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.nombre}"
                >

            </div>


            <div>

                <h4>
                    ${item.nombre}
                </h4>


                <span class="cart-item-price">
                    Q${item.precio.toFixed(2)}
                </span>


                <div class="quantity-controls">

                    <button
                        onclick="cambiarCantidad(
                            ${item.id},
                            -1
                        )"
                    >
                        −
                    </button>


                    <span>
                        ${item.cantidad}
                    </span>


                    <button
                        onclick="cambiarCantidad(
                            ${item.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="eliminarDelCarrito(${item.id})"
            >
                ×
            </button>

        `;


        contenedor.appendChild(elemento);

    });


    contador.textContent =
        cantidadTotal;


    totalElemento.textContent =
        `Q${total.toFixed(2)}`;


    if (carrito.length === 0) {

        vacio.classList.add("visible");

        footer.style.display = "none";

    } else {

        vacio.classList.remove("visible");

        footer.style.display = "block";

    }

}


/* =========================================
   CANTIDAD
========================================= */

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(
            item => item.id === id
        );


    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                item => item.id !== id
            );

    }


    actualizarCarrito();

}


/* =========================================
   ELIMINAR
========================================= */

function eliminarDelCarrito(id) {

    carrito =
        carrito.filter(
            item => item.id !== id
        );


    actualizarCarrito();

}


/* =========================================
   ABRIR CARRITO
========================================= */

function abrirCarrito() {

    const carritoOverlay =
        document.getElementById("cartOverlay");


    carritoOverlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CERRAR CARRITO
========================================= */

function cerrarCarrito() {

    const carritoOverlay =
        document.getElementById("cartOverlay");


    carritoOverlay.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* =========================================
   CERRAR HACIENDO CLICK AFUERA
========================================= */

function cerrarCarritoDesdeFondo(event) {

    if (
        event.target.id === "cartOverlay"
    ) {

        cerrarCarrito();

    }

}


/* =========================================
   ENVIAR PEDIDO A WHATSAPP
========================================= */

function enviarPedido() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    const numero =
        "50249450428";


    let mensaje =
        "Hola, Tananik. 🧶💕\n\n";


    mensaje +=
        "Quisiera realizar este pedido:\n\n";


    let total = 0;


    carrito.forEach(item => {

        const subtotal =
            item.precio *
            item.cantidad;


        total += subtotal;


        mensaje +=
            `• ${item.nombre}\n`;

        mensaje +=
            `  Cantidad: ${item.cantidad}\n`;

        mensaje +=
            `  Precio: Q${item.precio.toFixed(2)}\n`;

        mensaje +=
            `  Subtotal: Q${subtotal.toFixed(2)}\n\n`;

    });


    mensaje +=
        `TOTAL: Q${total.toFixed(2)}\n\n`;


    mensaje +=
        "El pago será realizado en efectivo. 💵\n\n";


    mensaje +=
        "Quisiera confirmar disponibilidad y los detalles de entrega."


    const url =
        `https://wa.me/${numero}?text=${
            encodeURIComponent(mensaje)
        }`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   CONSULTA AL CLIENTE
========================================= */

function enviarConsulta() {

    const nombre =
        document
            .getElementById("nombreCliente")
            .value
            .trim();


    const mensaje =
        document
            .getElementById("mensajeCliente")
            .value
            .trim();


    if (!nombre || !mensaje) {

        alert(
            "Por favor escribe tu nombre y tu pregunta."
        );

        return;

    }


    const texto =
        `Hola, Tananik. 🧶💕\n\n` +
        `Mi nombre es ${nombre}.\n\n` +
        `${mensaje}\n\n` +
        `Gracias. 😊`;


    const url =
        `https://wa.me/50249450428?text=${
            encodeURIComponent(texto)
        }`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================
   BUSCADOR
========================================= */

function buscarProductos() {

    const input =
        document.getElementById("buscador");


    if (!input) return;


    const texto =
        input.value
            .toLowerCase()
            .trim();


    if (!texto) {

        mostrarProductos();

        return;

    }


    const resultados =
        productos.filter(producto =>

            producto.nombre
                .toLowerCase()
                .includes(texto)

            ||

            producto.categoria
                .toLowerCase()
                .includes(texto)

        );


    mostrarProductos(resultados);

}


/* =========================================
   INICIAR
========================================= */

mostrarProductos();

actualizarCarrito();
