const menuContainer = document.getElementById("menu");

const products = [
    { nombre: "Príncipe", precio: 15 },
    { nombre: "Cazares", precio: 8 },
    { nombre: "Vero", precio: 3 },
    { nombre: "Hershey's", precio: 3 },
    { nombre: "Pelón", precio: 8 },
    { nombre: "Muecas", precio: 8 },
    { nombre: "Kit Kat", precio: 15 },
    { nombre: "Trident", precio: 3 },
    { nombre: "Kinder", precio: 8 },
    { nombre: "Winis", precio: 5 },
    { nombre: "Mazapán", precio: 5 },
    { nombre: "Papas Sol", precio: 18 },
    { nombre: "Muibon", precio: 5 },
];

products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>Precio: $${product.precio}</p>
    `;
    menuContainer.appendChild(productElement);
});
