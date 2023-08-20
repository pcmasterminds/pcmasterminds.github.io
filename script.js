const menuContainer = document.getElementById("menu");

const products = [
    { precio: 8, imagen: "/Images/Cazares.png" },
    { precio: 3, imagen: "/Images/Hersheys.png" },
    { precio: 8, imagen: "/Images/Kinder.png" },
    { precio: 15, imagen: "/Images/KitKat.svg" },
    { precio: 8, imagen: "/Images/Lucas.png" },
    { precio: 5, imagen: "/Images/Mazapan.svg" },
    { precio: 5, imagen: "/Images/Muibon.png" },
    { precio: 18, imagen: "Images/Sol.svg" },
    { precio: 8, imagen: "/Images/Pelon.png" },
    { precio: 15, imagen: "/Images/Principe.png" },
    { precio: 3, imagen: "/Images/Trident.png" },
    { precio: 3, imagen: "/Images/Vero.png" },
    { precio: 5, imagen: "/Images/Winis.png" },
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
