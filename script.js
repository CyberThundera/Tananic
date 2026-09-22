/* =====================================
   TANANIK
   SISTEMA DE TIENDA
===================================== */


/*
    =====================================
    PRODUCTOS
    =====================================

    PARA AGREGAR MÁS PRODUCTOS:

    Copia uno de estos objetos y cambia
    los datos.

    category puede ser:

    "Muñecos"
    "Peluches"
    "Regalos"

    Si tienes una fotografía del producto,
    coloca su ruta en "image".

    Ejemplo:

    image: "imagenes/pato-lucas.jpg"

    Si no colocas imagen:

    image: ""

    se mostrará un emoji.
*/


const productos = [

    {
        id: 1,

        nombre: "Pato Lucas con pantalones para tiendas",

        categoria: "Muñecos",

        precio: 20,

        descripcion:
            "Muñeco tejido a crochet inspirado en el Pato Lucas.",

        emoji: "🦆",

        image: ""
    }

];


/*
    =====================================
    CARRITO
=====================================
*/

let carrito = [];


/*
    =====================================
    MOSTRAR PRODUCTOS
=====================================
*/

function mostrarProductos() {

    const contenedor =
        document.getElementById("productos");

    contenedor.innerHTML = "";


    productos.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className = "product-card";


        let imagenHTML;


        if (producto.image) {

            imagenHTML = `
                <img
                    src="${producto.image}"
                    alt="${producto.nombre}"
                >
            `;

        } else {

            imagenHTML = `
                <div class="image-placeholder">
                    ${producto.emoji}
                </div>
            `;
        }


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
                        Q${producto.precio.toFixed(2)}
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


/*
    =====================================
    AGREGAR AL CARRITO
=====================================
*/

function agregarAlCarrito(id) {

    const producto =
        productos.find(p => p.id === id);


    if (!producto) {
        return;
    }


    const existente =
        carrito.find(item => item.id === id);


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1,

            image: producto.image,

            emoji: producto.emoji

        });

    }


    actualizarCarrito();

    abrirCarrito();

}


/*
    =====================================
    ACTUALIZAR CARRITO
=====================================
*/

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


    contenedor.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    carrito.forEach(item => {

        total += item.precio * item.cantidad;

        cantidadTotal += item.cantidad;


        let imagen;


        if (item.image) {

            imagen = `
                <img
                    src="${item.image}"
                    alt="${item.nombre}"
                >
            `;

        } else {

            imagen = item.emoji;

        }


        const elemento =
            document.createElement("div");

        elemento.className = "cart-item";


        elemento.innerHTML = `

            <div class="cart-item-image">

                ${imagen}

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
                        onclick="cambiarCantidad(${item.id}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${item.cantidad}
                    </span>


                    <button
                        onclick="cambiarCantidad(${item.id}, 1)"
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


/*
    =====================================
    CAMBIAR CANTIDAD
=====================================
*/

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(item => item.id === id);


    if (!producto) {
        return;
    }


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(item => item.id !== id);

    }


    actualizarCarrito();

}


/*
    =====================================
    ELIMINAR PRODUCTO
=====================================
*/

function eliminarDelCarrito(id) {

    carrito =
        carrito.filter(item => item.id !== id);

    actualizarCarrito();

}


/*
    =====================================
    ABRIR CARRITO
=====================================
*/

function abrirCarrito() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";

}


/*
    =====================================
    CERRAR CARRITO
=====================================
*/

function cerrarCarrito() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

    document.body.style.overflow = "";

}


/*
    =====================================
    CERRAR AL HACER CLICK AFUERA
=====================================
*/

function cerrarCarritoDesdeFondo(event) {

    if (
        event.target.id === "cartOverlay"
    ) {

        cerrarCarrito();

    }

}


/*
    =====================================
    ENVIAR PEDIDO POR WHATSAPP
=====================================
*/

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
        "Me gustaría realizar una consulta sobre este pedido:\n\n";


    let total = 0;


    carrito.forEach(item => {

        const subtotal =
            item.precio * item.cantidad;


        total += subtotal;


        mensaje +=
            `• ${item.nombre}\n`;

        mensaje +=
            `  Cantidad: ${item.cantidad}\n`;

        mensaje +=
            `  Precio: Q${item.precio.toFixed(2)}\n\n`;

    });


    mensaje +=
        `Total: Q${total.toFixed(2)}\n\n`;


    mensaje +=
        "Sé que el pago se realiza en efectivo. 💵\n";

    mensaje +=
        "Quisiera consultar disponibilidad y los detalles para realizar la compra. 😊";


    const url =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;


    window.open(
        url,
        "_blank"
    );

}


/*
    =====================================
    CONSULTA DE SERVICIO AL CLIENTE
=====================================
*/

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


    const numero =
        "50249450428";


    let texto =
        `Hola, Tananik. 🧶💕\n\n`;

    texto +=
        `Mi nombre es ${nombre}.\n\n`;

    texto +=
        `${mensaje}\n\n`;

    texto +=
        "Gracias. 😊";


    const url =
        `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;


    window.open(
        url,
        "_blank"
    );

}


/*
    =====================================
    INICIAR PÁGINA
=====================================
*/

mostrarProductos();

actualizarCarrito();