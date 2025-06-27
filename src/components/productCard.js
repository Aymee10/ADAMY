
const container = document.getElementById('containerProducts');
const resultsNumber = document.getElementById('ResultsNumber');


async function loadAndDisplayProducts(filter = "all") {

    let url = 'http://localhost:3000/products';

    switch (filter) {
        case "Mujer":
            url = 'http://localhost:3000/products?genero=Mujer';
            break;
        case "Hombre":
            url = 'http://localhost:3000/products?genero=Hombre';
            break;
        case "Invierno":
            url = 'http://localhost:3000/products?temporada=Invierno';
            break;
        case "Verano":
            url = 'http://localhost:3000/products?temporada=Verano';
            break;
        case "Otoño":
            url = 'http://localhost:3000/products?temporada=Otoño';
            break;
        case "Primavera":
            url = 'http://localhost:3000/products?temporada=Primavera';
            break;
        case "Casual":
            url = 'http://localhost:3000/products?estilo=Casual';
            break;
        case "Formal":
            url = 'http://localhost:3000/products?estilo=Formal';
            break;
        case "Deportivo":
            url = 'http://localhost:3000/products?estilo=Deportivo';
            break;
        case "Negro":
            url = 'http://localhost:3000/products?color=Negro';
            break;
        case "Blanco":
            url = 'http://localhost:3000/products?color=Blanco';
            break;
        case "Azul":
            url = 'http://localhost:3000/products?color=Azul';
            break;
        case "Rojo":
            url = 'http://localhost:3000/products?color=Rojo';
            break;
        case "Gris":
            url = 'http://localhost:3000/products?color=Gris';
            break;
        case "Beige":
            url = 'http://localhost:3000/products?color=Beige';
            break;
        case "Amarillo":
            url = 'http://localhost:3000/products?color=Amarillo';
            break;
        case "Verde":
            url = 'http://localhost:3000/products?color=Verde';
            break;
        case "Rosa":
            url = 'http://localhost:3000/products?color=Rosa';
            break;
        case "next":
            url = 'https://fakestoreapi.com/products/1';
            break;
        default:
            // Mantiene la URL original sin filtros
            break;
    }
    try {
        const response = await fetch(url);
        const products = await response.json();

        paintCards(products);

    } catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;

    }
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function searchProducts(searchText) {

    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        const searchTxt = normalizeText(searchText);

        const results = products.filter(p =>
            (p.nombre && normalizeText(p.nombre).includes(searchTxt)) ||
            (p.genero && normalizeText(p.genero).includes(searchTxt)) ||
            (p.temporada && normalizeText(p.temporada).includes(searchTxt)) ||
            (p.tipo && normalizeText(p.tipo).includes(searchTxt)) ||
            (p.fecha_lanzamiento && normalizeText(p.fecha_lanzamiento).includes(searchTxt)) ||
            (p.estilo && normalizeText(p.estilo).includes(searchTxt))
        );

        paintCards(results);
    }
    catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;

    }
}

function paintCards(products) {

    if (!products || !products.length) {
        container.innerHTML = "<p>No hay productos disponibles.</p>";
        resultsNumber.textContent = "0 Resultados";
        return;
    }
    total = products.length;
    resultsNumber.textContent = `${total} Resultados`;
    let html = "";

    for (const product of products) {

        let image = "../img/sin-imagen.png"
        if (product.imagen && Array.isArray(product.imagen)) {
            if (product.imagen.length >= 2 && product.imagen[1]) {
                image = product.imagen[1];
            } else if (product.imagen.length >= 1 && product.imagen[0]) {
                image = product.imagen[0];
            }
        }
        html += `
        <div class="productShow">
            <a href="productView.html?id=${product.id}">
                <img src="${image}" alt="${product.nombre}" width="150">
            </a>
            <h4>${product.nombre}</h4>
            <p><strong>Precio:</strong> €${product.precio}</p>
            ${product.descuento > 0
                ? `<p style="color: red;"><strong>Descuento:</strong> ${product.descuento}%</p>`
                : ''
            }
        </div>
    `;
    }

    container.innerHTML = html;
}
//document.addEventListener('DOMContentLoaded', loadAndDisplayProducts("Mujer"));//llamada con parametro para filtrar

//Este escucha el evento de la barra lateral
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const valor = this.dataset.text;
        loadAndDisplayProducts(valor);
    });
});
//este escucha el evento en el menu hamburguesa
document.querySelectorAll('.link-hover').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // evita recargar
        const categoria = this.getAttribute('data-id');
        loadAndDisplayProducts(categoria);
    });
});


//cuando se da en Buscar
const btnSearch = document.getElementById("searchButton");

btnSearch.addEventListener("click", () => {
    const searchValue = document.getElementById("searchText").value.trim();

    if (searchValue === "") {
        alert("Por favor ingresa un término de búsqueda.");
        return;
    }
    searchProducts(searchValue);
});

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
        loadAndDisplayProducts(id);
    } else {
        loadAndDisplayProducts();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (search) {
        searchProducts(search);
    }
});

//Para ordenar con el select por precio y descuento
document.getElementById('sortSelect').addEventListener('change', async function () {
    const sortOption = this.value;

    try {
        const response = await fetch('http://localhost:3000/products');
        let products = await response.json();

        // Aplica el ordenamiento
        switch (sortOption) {
            case 'precio_asc':
                products.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio_desc':
                products.sort((a, b) => b.precio - a.precio);
                break;
            case 'descuento_asc':
                products = products.filter(p => p.descuento > 0);
                products.sort((a, b) => a.descuento - b.descuento);
                break;
            case 'descuento_desc':
                products = products.filter(p => p.descuento > 0);
                products.sort((a, b) => b.descuento - a.descuento);
                break;
            default:
                // No hacer nada, mantener el orden original
                break;
        }

        paintCards(products);
    } catch (error) {
        container.innerHTML = `<p>Error al ordenar productos: ${error.message}</p>`;
    }
});
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);