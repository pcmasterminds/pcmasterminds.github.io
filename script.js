const menuContainer = document.getElementById("menu");

const products = [
    { precio: 15, imagen: "/Imagenes/KitKat.svg" },
    { precio: 8, imagen: "/Imagenes/Lucas.png" },
    { precio: 8, imagen: "/Imagenes/Cazares.png" },
    { precio: 3, imagen: "/Imagenes/Vero.png" },
    { precio: 8, imagen: "/Imagenes/Pelon.png" },
    { precio: 5, imagen: "/Imagenes/Mazapan.svg" },
    // ... Agrega otros productos aquí ...
];

products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <img src="${product.imagen}" alt="Producto" class="product-image">
        <p class="price">Precio: $${product.precio}</p>
    `;
    menuContainer.appendChild(productElement);
});
